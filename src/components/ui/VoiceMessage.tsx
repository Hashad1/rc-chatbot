import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface VoiceMessageProps {
  duration: number;
}

export function VoiceMessage({ duration }: VoiceMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-8 h-8 rounded-full bg-[#B388FF] flex items-center justify-center"
        aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-white" />
        ) : (
          <Play className="w-4 h-4 text-white" />
        )}
      </button>
      <div className="flex-1">
        <div className="h-2 bg-[#2D2D2D] rounded-full overflow-hidden">
          <div
            className={`h-full bg-[#B388FF] transition-all duration-200 ${
              isPlaying ? 'animate-progress' : ''
            }`}
            style={{ width: '60%' }}
          />
        </div>
      </div>
      <span className="text-xs text-[#808080]">{duration}s</span>
    </div>
  );
}