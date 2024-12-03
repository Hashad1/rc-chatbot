import React from 'react';
import { MessageStatus } from './ui/MessageStatus';
import { VoiceMessage } from './ui/VoiceMessage';
import { MessageAvatar } from './ui/MessageAvatar';
import type { Message as MessageType } from '../types/message';

type MessageProps = MessageType;

export function Message({ content, timestamp, isSender, status, type, duration }: MessageProps) {
  return (
    <div
      className={`flex items-end gap-2 ${
        isSender ? 'flex-row-reverse' : 'flex-row'
      } mb-4 px-4 animate-fadeIn`}
    >
      <MessageAvatar isSender={isSender} />
      <div
        className={`max-w-[70%] rounded-xl p-3 ${
          isSender ? 'bg-[#8A2BE2]' : 'bg-[#1A1A1A]'
        } message-bubble transition-all`}
      >
        {type === 'text' ? (
          <p className="text-white text-sm">{content}</p>
        ) : (
          <VoiceMessage duration={duration || 0} />
        )}
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-[10px] text-[#808080]">{timestamp}</span>
          {isSender && <MessageStatus status={status} />}
        </div>
      </div>
    </div>
  );
}