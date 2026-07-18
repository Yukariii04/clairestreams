import { StatusBadge } from './StatusBadge.jsx';
import { generateInvite } from '../session/index.js';
import { useState } from 'react';
import logo from '../assets/logo.jpeg';
import { DarkModeToggle } from './DarkModeToggle.jsx';

export function Navbar({ isHost, rtcStatus, onEnd, sessionId }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generateInvite(sessionId));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white/90 dark:bg-slate-900/90 border-b border-med-sand dark:border-slate-800 backdrop-blur-md relative z-20 shadow-sm transition-colors duration-700">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-med-sand dark:border-slate-700">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-serif font-semibold text-med-navy dark:text-slate-100">ClaireStreams</h1>
          <span className="font-hand text-xl text-med-ocean dark:text-blue-300 ml-2 pt-1">{isHost ? 'Host' : 'Guest'}</span>
        </div>
        <StatusBadge rtcStatus={rtcStatus} />
      </div>
      
      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        {isHost && (
          <button 
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 bg-med-sand/50 hover:bg-med-sand dark:bg-slate-800 dark:hover:bg-slate-700 text-med-navy dark:text-slate-200 text-sm font-medium rounded-xl transition-colors border border-med-sand dark:border-slate-700"
          >
            <svg className="w-4 h-4 text-med-ocean dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span>{copied ? 'Copied Link!' : 'Invite Guests'}</span>
          </button>
        )}
        <button 
          onClick={onEnd}
          className="px-5 py-2 bg-white hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-900/30 border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl transition-all shadow-sm"
        >
          {isHost ? 'End Broadcast' : 'Leave'}
        </button>
      </div>
    </header>
  );
}
