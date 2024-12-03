import React from 'react';
import { MessageSquare, Mic } from 'lucide-react';

interface ChatModesProps {
  mode: 'text' | 'voice';
  onModeChange: (mode: 'text' | 'voice') => void;
}

export function ChatModes({ mode, onModeChange }: ChatModesProps) {
  return (
    <div className="fixed top-20 left-0 right-0 p-4 glass-effect z-40">
      <div className="max-w-4xl mx-auto flex justify-center gap-4">
        <button
          onClick={() => onModeChange('text')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
            mode === 'text' 
              ? 'bg-[#8A2BE2] shadow-neon' 
              : 'bg-[#1A1A1A] hover:bg-[#2A2A2A]'
          }`}
          aria-label="وضع المحادثة النصية"
        >
          <MessageSquare className="w-5 h-5 text-white" />
          <span className="text-white">محادثة نصية</span>
        </button>
        <button
          onClick={() => onModeChange('voice')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
            mode === 'voice' 
              ? 'bg-[#8A2BE2] shadow-neon' 
              : 'bg-[#1A1A1A] hover:bg-[#2A2A2A]'
          }`}
          aria-label="وضع المحادثة الصوتية"
        >
          <Mic className="w-5 h-5 text-white" />
          <span className="text-white">محادثة صوتية</span>
        </button>
      </div>
    </div>
  );
}