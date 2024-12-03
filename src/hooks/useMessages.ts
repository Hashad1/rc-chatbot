import { useState, useCallback, useEffect } from 'react';
import { Message } from '../types/message';

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    content: "مرحباً بك في المستشار الذكي للهيئة الملكية بالجبيل - إدارة التشجير والري. كيف يمكنني مساعدتك اليوم؟",
    timestamp: new Intl.DateTimeFormat('ar-EG', { 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true 
    }).format(new Date()),
    isSender: false,
    status: 'read',
    type: 'text',
  }
];

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: Date.now(),
      content,
      timestamp: new Intl.DateTimeFormat('ar-EG', { 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true 
      }).format(new Date()),
      isSender: true,
      status: 'sent',
      type: 'text',
    };

    setMessages(prev => [...prev, newMessage]);

    setTimeout(() => setIsTyping(true), 1000);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        content: "شكراً على سؤالك. سأقوم بمساعدتك في أقرب وقت ممكن.",
        timestamp: new Intl.DateTimeFormat('ar-EG', { 
          hour: 'numeric', 
          minute: 'numeric',
          hour12: true 
        }).format(new Date()),
        isSender: false,
        status: 'sent',
        type: 'text',
      }]);
    }, 4000);
  }, []);

  useEffect(() => {
    const updateMessageStatus = (id: number, status: Message['status']) => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === id ? { ...msg, status } : msg
        )
      );
    };

    messages.forEach(msg => {
      if (msg.isSender && msg.status === 'sent') {
        setTimeout(() => updateMessageStatus(msg.id, 'delivered'), 1000);
        setTimeout(() => updateMessageStatus(msg.id, 'read'), 2000);
      }
    });
  }, [messages]);

  return {
    messages,
    sendMessage,
    isTyping,
  };
}