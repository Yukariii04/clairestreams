import { useNavigate } from 'react-router-dom';
import { createSession } from '../session/index.js';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.jpeg';

import { DarkModeToggle } from '../components/DarkModeToggle.jsx';

import { BackgroundEffects } from '../components/BackgroundEffects.jsx';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden font-sans transition-colors duration-700 dark:bg-slate-950 dark:text-slate-100 bg-[#fdf4db] text-med-navy">
      <BackgroundEffects />
      
      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6 z-50">
         <DarkModeToggle />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md backdrop-blur-[24px] rounded-[2.5rem] p-10 flex flex-col items-center text-center transition-all duration-700 border bg-white/40 border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.05),0_0_40px_rgba(253,224,71,0.15)] dark:bg-slate-900/40 dark:border-slate-700/50 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(59,130,246,0.15)]">
          
          <div className="w-32 h-32 mb-8 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 transform hover:scale-105 hover:rotate-3 ring-4 ring-white dark:ring-slate-800/80">
             <img src={logo} alt="ClaireStreams Logo" className="w-full h-full object-cover" />
          </div>
          
          <h1 className="text-4xl font-serif font-bold tracking-tight mb-2 transition-colors duration-700 text-med-navy dark:text-slate-100 dark:drop-shadow-sm">
            ClaireStreams
          </h1>
          <p className="font-hand text-3xl mb-12 transform -rotate-3 transition-colors duration-700 text-med-ocean dark:text-blue-300 dark:drop-shadow-md">
            Share your screen, beautifully.
          </p>
          
          <button 
            onClick={async () => {
              const s = await createSession();
              navigate(`/session/${s.sessionId}?role=host`);
            }} 
            className="w-full py-4 rounded-2xl text-lg font-semibold tracking-wide transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 bg-med-ocean hover:bg-med-navy text-white shadow-[0_10px_20px_rgba(2,132,199,0.2)] hover:shadow-[0_15px_30px_rgba(2,132,199,0.3)] border border-med-ocean/20 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:shadow-[0_10px_20px_rgba(79,70,229,0.3)] dark:hover:shadow-[0_15px_30px_rgba(79,70,229,0.5)] dark:border-indigo-500/50"
          >
            Start a Broadcast
          </button>
        </div>
      </div>
    </div>
  );
}
