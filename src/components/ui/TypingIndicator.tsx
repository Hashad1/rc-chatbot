import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1 px-2 py-1 bg-[#2D2D2D] rounded-xl w-16">
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className="w-2 h-2 bg-[#808080] rounded-full animate-bounce"
          style={{
            animationDelay: `${dot * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );
}