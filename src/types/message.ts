export interface Message {
  id: number;
  content: string;
  timestamp: string;
  isSender: boolean;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'voice';
  duration?: number; // for voice messages
}

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  lastSeen: string;
  isTyping?: boolean;
}

export type MessageStatus = 'sent' | 'delivered' | 'read';