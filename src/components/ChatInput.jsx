import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

export function ChatInput({ onSend, replyingTo, onCancelReply }) {
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEmojiClick = (emojiObj) => {
    setText(prev => prev + emojiObj.emoji);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-t border-med-sand dark:border-slate-800 transition-colors duration-700 relative flex flex-col">
      {replyingTo && (
        <div className="px-4 pt-3 flex items-center justify-between">
          <div className="flex flex-col bg-med-sky/30 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-med-ocean/20 dark:border-blue-400/20 text-xs w-full mr-2">
            <span className="font-semibold text-med-navy dark:text-blue-300">Replying to {replyingTo.sender}</span>
            <span className="text-med-navy/70 dark:text-slate-400 truncate">{replyingTo.text}</span>
          </div>
          <button onClick={onCancelReply} className="text-med-navy/50 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}
      
      {showEmoji && (
        <div ref={emojiRef} className="absolute bottom-full right-4 mb-2 z-50">
          <EmojiPicker 
            onEmojiClick={handleEmojiClick}
            theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
            lazyLoadEmojis={true}
          />
        </div>
      )}
      
      <form className="p-4" onSubmit={e => {
        e.preventDefault();
        const val = text.trim();
        if (val) { onSend(val); setText(''); setShowEmoji(false); }
      }}>
        <div className="relative flex items-center">
          <button 
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className="absolute left-3 text-xl text-med-ocean/70 hover:text-med-ocean dark:text-blue-400/70 dark:hover:text-blue-300 transition-colors z-10"
          >
            😀
          </button>
          <input 
            name="msg" 
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full pl-10 pr-12 py-3 bg-med-cream dark:bg-slate-800 border border-med-sand dark:border-slate-700 text-med-navy dark:text-slate-100 text-sm rounded-2xl focus:outline-none focus:border-med-ocean dark:focus:border-blue-400 focus:ring-1 focus:ring-med-ocean dark:focus:ring-blue-400 transition-all placeholder-med-navy/40 dark:placeholder-slate-400" 
            placeholder="Write a message..." 
            autoComplete="off" 
          />
          <button type="submit" className="absolute right-2 top-2 bottom-2 w-8 flex items-center justify-center text-med-ocean dark:text-blue-300 hover:bg-med-sky dark:hover:bg-slate-700 rounded-xl transition-colors">
            <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
          </button>
        </div>
      </form>
    </div>
  );
}
