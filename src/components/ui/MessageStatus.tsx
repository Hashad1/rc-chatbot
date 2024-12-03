import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

interface MessageStatusProps {
  status: 'sent' | 'delivered' | 'read';
}

export function MessageStatus({ status }: MessageStatusProps) {
  switch (status) {
    case 'read':
      return <CheckCheck className="w-4 h-4 text-blue-400" />;
    case 'delivered':
      return <CheckCheck className="w-4 h-4 text-gray-400" />;
    default:
      return <Check className="w-4 h-4 text-gray-400" />;
  }
}