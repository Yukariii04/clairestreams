export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Glowing Atmosphere Blobs */}
      <div className="absolute -top-32 -left-32 w-[45rem] h-[45rem] rounded-full filter blur-[120px] transition-all duration-1000 bg-yellow-300 opacity-70 dark:bg-indigo-900/40 dark:opacity-40"></div>
      <div className="absolute top-[20%] -right-32 w-[40rem] h-[40rem] rounded-full filter blur-[120px] transition-all duration-1000 bg-rose-300 opacity-50 dark:bg-purple-900/30 dark:opacity-40"></div>
      <div className="absolute -bottom-32 left-[10%] w-[50rem] h-[50rem] rounded-full filter blur-[140px] transition-all duration-1000 bg-sky-300 opacity-70 dark:bg-blue-900/30 dark:opacity-40"></div>
      
      {/* Scrapbook Elements (Lemons, Tiles, Shells) */}
      <div className="absolute top-[10%] left-[8%] text-7xl transform -rotate-12 transition-all duration-500 hover:scale-110 drop-shadow-xl opacity-80 dark:opacity-20 dark:grayscale">🍋</div>
      <div className="absolute bottom-[15%] left-[12%] text-6xl transform rotate-12 transition-all duration-500 hover:scale-110 drop-shadow-xl opacity-70 dark:opacity-20 dark:grayscale">🐚</div>
      <div className="absolute top-[20%] right-[10%] text-[8rem] transform rotate-45 transition-all duration-500 hover:scale-110 drop-shadow-xl opacity-30 dark:opacity-10 dark:grayscale">🌊</div>
      <div className="absolute bottom-[25%] right-[12%] text-5xl transform -rotate-12 transition-all duration-500 hover:scale-110 drop-shadow-xl opacity-60 dark:opacity-20 dark:grayscale">🦋</div>
      <div className="absolute top-[5%] right-[30%] text-5xl transform rotate-6 transition-all duration-500 hover:scale-110 drop-shadow-lg opacity-50 dark:opacity-30">✨</div>
      
      {/* Subtle tile pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04] transition-opacity duration-700 dark:invert dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
    </div>
  );
}
