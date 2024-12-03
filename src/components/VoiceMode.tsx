import React from 'react';
import { Mic, X } from 'lucide-react';
import { useCommunication } from '../hooks/useCommunication';

interface VoiceModeProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function VoiceMode({ isRecording, onStartRecording, onStopRecording }: VoiceModeProps) {
  const { amplitude } = useCommunication();

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div 
        className={`w-48 h-48 rounded-full relative flex items-center justify-center
          ${isRecording ? 'bg-[#8A2BE2]/10' : 'bg-[#1A1A1A]'}`}
      >
        {isRecording && (
          <>
            <div className="absolute inset-0 rounded-full bg-[#8A2BE2]/5 animate-ping" 
                 style={{ animationDuration: '2s' }} />
            <div className="absolute inset-0 rounded-full bg-[#8A2BE2]/10"
                 style={{ transform: `scale(${1 + amplitude * 0.3})`, transition: 'transform 0.1s' }} />
          </>
        )}
        
        <div 
          className={`w-32 h-32 rounded-full flex items-center justify-center
            ${isRecording ? 'bg-gradient-to-b from-[#8A2BE2] to-[#7B1FA2]' : 'bg-[#2A2A2A]'}
            transition-colors duration-300`}
        >
          <Mic className={`w-12 h-12 ${isRecording ? 'text-white' : 'text-[#8A2BE2]'}`} />
        </div>
      </div>

      {isRecording ? (
        <button
          onClick={onStopRecording}
          className="mt-8 p-4 rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors"
          aria-label="إيقاف التسجيل"
        >
          <X className="w-6 h-6 text-red-500" />
        </button>
      ) : (
        <button
          onClick={onStartRecording}
          className="mt-8 px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors"
        >
          <span className="text-white">انقر للتحدث</span>
        </button>
      )}
    </div>
  );
}