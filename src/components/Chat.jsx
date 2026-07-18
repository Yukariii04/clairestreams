import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage.jsx';
import { ChatInput } from './ChatInput.jsx';

import { subscribeChat, pushChatMessage } from '../firebase/index.js';

export function Chat({ sessionId, isHost }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  const role = isHost ? 'host' : 'viewer';
  const roleDisplayName = isHost ? 'Host' : 'Guest';

  useEffect(() => {
    const unsub = subscribeChat(sessionId, role, (message) => {
      setMessages(prev => [...prev, { sender: message.sender === 'host' ? 'Host' : 'Guest', text: message.text, self: false }]);
    });
    return () => unsub();
  }, [sessionId, role]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  async function sendMessage(text) {
    setMessages(prev => [...prev, { sender: roleDisplayName, text, self: true }]); 
    await pushChatMessage(sessionId, role, text);
  }

  return (
    <div className="w-80 flex flex-col bg-white dark:bg-slate-900 border-l border-med-sand dark:border-slate-800 shadow-soft z-10 transition-colors duration-700">
      <div className="px-6 py-4 border-b border-med-sand dark:border-slate-800 bg-med-cream/50 dark:bg-slate-800/50 flex items-center space-x-2">
         <span className="text-xl">🍋</span>
         <h2 className="font-serif font-semibold text-lg text-med-navy dark:text-slate-100">Session Notes</h2>
      </div>
      <div className="flex-1 p-6 overflow-y-auto" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <p className="font-hand text-2xl text-med-ocean/60 dark:text-blue-300/50 -rotate-2">Jot down your thoughts here...</p>
          </div>
        ) : (
          messages.map((m, i) => <ChatMessage key={i} msg={m} isSelf={m.self} />)
        )}
      </div>
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
