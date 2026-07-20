import { useState } from 'react';

export function ChatMessage({ msg, isSelf, onReply }) {
  const [hover, setHover] = useState(false);

  return (
    <div 
      className={`flex flex-col mb-4 ${isSelf ? 'items-end' : 'items-start'} group relative`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`flex items-end ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}>
        <span className="font-hand text-sm text-med-ocean dark:text-blue-300 mb-1 px-1">{msg.sender}</span>
        {hover && (
          <button 
            onClick={onReply} 
            className={`text-xs px-2 py-1 mx-2 text-med-navy/60 hover:text-med-ocean dark:text-slate-400 dark:hover:text-blue-300 transition-colors ${isSelf ? 'mr-2' : 'ml-2'} mb-1`}
            title="Reply"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
          </button>
        )}
      </div>

      <div className={`flex flex-col max-w-[90%] ${isSelf ? 'items-end' : 'items-start'}`}>
        {msg.replyTo && (
          <div className={`px-3 py-1.5 text-xs rounded-lg mb-1 shadow-inner-soft border transition-colors duration-700 flex flex-col ${
            isSelf 
              ? 'bg-med-navy/10 border-med-ocean/20 dark:bg-slate-800/60 dark:border-indigo-500/30 items-end text-right' 
              : 'bg-med-cream/50 border-med-sand/50 dark:bg-slate-700/50 dark:border-slate-600/50 items-start text-left'
          }`}>
            <span className="font-semibold text-med-ocean dark:text-blue-300">{msg.replyTo.sender}</span>
            <span className="truncate opacity-80 max-w-xs">{msg.replyTo.text}</span>
          </div>
        )}
        <div className={`px-4 py-2.5 text-sm rounded-2xl break-words shadow-sm transition-colors duration-700 ${
          isSelf 
            ? 'bg-med-ocean dark:bg-indigo-600 text-white rounded-tr-sm' 
            : 'bg-med-cream dark:bg-slate-800 text-med-navy dark:text-slate-200 border border-med-sand dark:border-slate-700 rounded-tl-sm'
        }`}>
          {msg.text}
        </div>
      </div>
    </div>
  );
}
