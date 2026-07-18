export function ChatMessage({ msg, isSelf }) {
  return (
    <div className={`flex flex-col mb-4 ${isSelf ? 'items-end' : 'items-start'}`}>
      <span className="font-hand text-sm text-med-ocean dark:text-blue-300 mb-1 px-1">{msg.sender}</span>
      <div className={`px-4 py-2.5 text-sm rounded-2xl max-w-[90%] break-words shadow-sm transition-colors duration-700 ${
        isSelf 
          ? 'bg-med-ocean dark:bg-indigo-600 text-white rounded-tr-sm' 
          : 'bg-med-cream dark:bg-slate-800 text-med-navy dark:text-slate-200 border border-med-sand dark:border-slate-700 rounded-tl-sm'
      }`}>
        {msg.text}
      </div>
    </div>
  );
}
