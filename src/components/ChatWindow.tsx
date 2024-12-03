import React from 'react';
import { Message } from './Message';
import { TypingIndicator } from './ui/TypingIndicator';
import type { Message as MessageType } from '../types/message';

interface ChatWindowProps {
  messages: MessageType[];
  isTyping?: boolean;
}

export function ChatWindow({ messages, isTyping }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col-reverse min-h-full">
        {isTyping && (
          <div className="flex justify-start px-4 mb-4">
            <TypingIndicator />
          </div>
        )}
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </div>
    </div>
  );
}