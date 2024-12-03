import React from 'react';
import { Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 glass-effect flex items-center px-6 z-50">
      <div className="flex items-center gap-4">
        <img 
          src="/rcj-logo.png" 
          alt="الهيئة الملكية بالجبيل"
          className="h-16 w-16 object-contain"
        />
        <div className="flex flex-col">
          <h1 className="text-white text-lg font-bold">
            المستشار الذكي للهيئة الملكية بالجبيل
          </h1>
          <p className="text-gray-300 text-sm">
            إدارة التشجير والري
          </p>
        </div>
      </div>
      <button 
        className="mr-auto p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="الإعدادات"
      >
        <Settings className="w-6 h-6 text-white" />
      </button>
    </header>
  );
}