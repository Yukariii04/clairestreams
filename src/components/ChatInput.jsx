export function ChatInput({ onSend }) {
  return (
    <form className="p-4 bg-white dark:bg-slate-900 border-t border-med-sand dark:border-slate-800 transition-colors duration-700" onSubmit={e => {
      e.preventDefault();
      const val = e.target.msg.value.trim();
      if (val) { onSend(val); e.target.msg.value = ''; }
    }}>
      <div className="relative">
        <input 
          name="msg" 
          className="w-full pl-4 pr-12 py-3 bg-med-cream dark:bg-slate-800 border border-med-sand dark:border-slate-700 text-med-navy dark:text-slate-100 text-sm rounded-2xl focus:outline-none focus:border-med-ocean dark:focus:border-blue-400 focus:ring-1 focus:ring-med-ocean dark:focus:ring-blue-400 transition-all placeholder-med-navy/40 dark:placeholder-slate-400" 
          placeholder="Write a message..." 
          autoComplete="off" 
        />
        <button type="submit" className="absolute right-2 top-2 bottom-2 w-8 flex items-center justify-center text-med-ocean dark:text-blue-300 hover:bg-med-sky dark:hover:bg-slate-700 rounded-xl transition-colors">
          <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
        </button>
      </div>
    </form>
  );
}
