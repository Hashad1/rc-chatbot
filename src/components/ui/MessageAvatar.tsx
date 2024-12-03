import React from 'react';

interface MessageAvatarProps {
  isSender: boolean;
}

export function MessageAvatar({ isSender }: MessageAvatarProps) {
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center">
      {isSender ? (
        <svg className="w-6 h-6 text-[#808080]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 4a4 4 0 100 8 4 4 0 000-8z" />
          <path d="M20 19v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1a6 6 0 0112 0z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-[#007BFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="7" width="18" height="12" rx="2" />
          <circle cx="12" cy="13" r="2" />
          <path d="M8 7v-2a2 2 0 012-2h4a2 2 0 012 2v2" />
          <path d="M9 17v2" />
          <path d="M15 17v2" />
        </svg>
      )}
    </div>
  );
}