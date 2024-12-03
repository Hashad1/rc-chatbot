import React from 'react';
import { User2 } from 'lucide-react';

interface AvatarProps {
  url?: string;
  alt: string;
  size?: 'sm' | 'md';
}

export function Avatar({ url, alt, size = 'md' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
  };

  if (!url) {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-[#2D2D2D] flex items-center justify-center`}>
        <User2 className="w-5 h-5 text-gray-400" />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className={`${sizeClasses[size]} rounded-full object-cover`}
    />
  );
}