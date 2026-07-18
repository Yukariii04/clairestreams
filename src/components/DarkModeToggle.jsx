import { useState, useEffect } from 'react';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'theme') setIsDark(e.newValue === 'dark');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <button 
      type="button"
      onClick={() => setIsDark(prev => !prev)}
      className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-soft border ${
        isDark 
          ? 'bg-slate-800/50 border-slate-700 text-yellow-300 hover:bg-slate-700/80 hover:scale-105 hover:shadow-[0_0_20px_rgba(253,224,71,0.2)]' 
          : 'bg-white/60 border-white text-med-ocean hover:bg-white hover:scale-105'
      }`}
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <svg className="w-5 h-5 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
      ) : (
        <svg className="w-5 h-5 text-indigo-900 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
      )}
    </button>
  );
}
