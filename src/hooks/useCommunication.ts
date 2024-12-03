import { useState, useCallback, useEffect } from 'react';
import { FileTransfer } from '../services/FileTransfer';
import { VoiceStream } from '../services/VoiceStream';
import { WebhookManager } from '../services/WebhookManager';
import { FileUploader } from '../services/FileUploader';
import { env } from '../config/env';
import type { Message } from '../types/message';

const fileTransfer = new FileTransfer();
const voiceStream = new VoiceStream();
const webhookManager = new WebhookManager(env.WEBHOOK_API_KEY);
const fileUploader = new FileUploader();

// Register the webhook endpoint
webhookManager.registerEndpoint('default', env.WEBHOOK_URL);

export function useCommunication() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [amplitude, setAmplitude] = useState(0);

  useEffect(() => {
    const handleAmplitude = (value: number) => setAmplitude(value);
    const handleError = (error: Error) => {
      console.error('Voice stream error:', error);
      setIsStreaming(false);
    };

    voiceStream.on('amplitude', handleAmplitude);
    voiceStream.on('error', handleError);
    voiceStream.on('stopped', () => setIsStreaming(false));

    return () => {
      voiceStream.off('amplitude', handleAmplitude);
      voiceStream.off('error', handleError);
      voiceStream.off('stopped', () => setIsStreaming(false));
    };
  }, []);

  const sendMessage = useCallback(async (content: string): Promise<void> => {
    try {
      const message: Partial<Message> = {
        content,
        timestamp: new Date().toISOString(),
        type: 'text',
        status: 'sent',
      };

      await webhookManager.trigger('default', message);
      
      setTimeout(() => {
        message.status = 'delivered';
        webhookManager.trigger('default', { messageId: message.id, status: 'delivered' });
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, []);

  const uploadFile = useCallback(async (file: File): Promise<void> => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      await fileUploader.validateFile(file);
      
      const { url } = await fileUploader.uploadFile(file, (progress) => {
        setUploadProgress(progress);
      });

      await webhookManager.trigger('default', { 
        type: 'file',
        url,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, []);

  const toggleVoiceStream = useCallback(async (): Promise<void> => {
    try {
      if (isStreaming) {
        voiceStream.stopStream();
        setIsStreaming(false);
      } else {
        await voiceStream.startStream();
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error toggling voice stream:', error);
      setIsStreaming(false);
    }
  }, [isStreaming]);

  return {
    sendMessage,
    uploadFile,
    toggleVoiceStream,
    isUploading,
    uploadProgress,
    isStreaming,
    amplitude,
  };
}