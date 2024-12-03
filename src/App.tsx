import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatInput } from './components/ChatInput';
import { ChatWindow } from './components/ChatWindow';
import { ChatModes } from './components/ChatModes';
import { VoiceMode } from './components/VoiceMode';
import { useMessages } from './hooks/useMessages';
import { useCommunication } from './hooks/useCommunication';

type ChatMode = 'text' | 'voice';

export default function App() {
  const [mode, setMode] = useState<ChatMode>('text');
  const { messages, sendMessage, isTyping } = useMessages();
  const { toggleVoiceStream, isStreaming } = useCommunication();

  const handleStartRecording = async () => {
    await toggleVoiceStream();
  };

  const handleStopRecording = async () => {
    await toggleVoiceStream();
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E]">
      <Header />
      <ChatModes mode={mode} onModeChange={setMode} />
      
      <main className="pt-40 pb-24 px-4 max-w-4xl mx-auto h-screen flex flex-col">
        {mode === 'text' ? (
          <>
            <ChatWindow messages={messages} isTyping={isTyping} />
            <ChatInput onSendMessage={sendMessage} />
          </>
        ) : (
          <VoiceMode
            isRecording={isStreaming}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
        )}
      </main>
    </div>
  );
}