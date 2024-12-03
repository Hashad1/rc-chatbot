import React, { useState, FormEvent, useRef, ChangeEvent } from 'react';
import { Send, Mic, Image } from 'lucide-react';
import { useCommunication } from '../hooks/useCommunication';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading, uploadProgress } = useCommunication();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadFile(file);
      onSendMessage(`[ملف] ${file.name}`);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 p-4 glass-effect">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn-3d p-3 rounded-full bg-[var(--color-accent)] relative"
          aria-label="إرفاق ملف"
          disabled={isUploading}
        >
          <Image className="w-5 h-5 text-white" />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full border-2 border-white border-t-transparent animate-spin" />
            </div>
          )}
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="كيف يمكنني مساعدتك؟"
          className="flex-1 input-3d bg-white/10 text-white rounded-full px-6 py-3 
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
          dir="rtl"
          disabled={isUploading}
        />

        <button
          type="submit"
          disabled={!message.trim() || isUploading}
          className="btn-3d p-3 rounded-full bg-[var(--color-primary)] disabled:opacity-50"
          aria-label="إرسال"
        >
          <Send className="w-5 h-5 text-white" />
        </button>

        <button
          type="button"
          className="btn-3d p-3 rounded-full bg-[var(--color-secondary)]"
          aria-label="تسجيل صوتي"
          disabled={isUploading}
        >
          <Mic className="w-5 h-5 text-white" />
        </button>
      </div>

      {isUploading && (
        <div className="max-w-4xl mx-auto mt-2">
          <div className="bg-white/10 rounded-full h-1">
            <div 
              className="bg-[var(--color-secondary)] h-full rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
    </form>
  );
}