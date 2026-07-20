import { useEffect, useRef, useState } from 'react';

export function VideoPlayer({ stream, muted = false, isHost = false }) {
  const ref = useRef();
  const [playError, setPlayError] = useState(false);

  useEffect(() => { 
    if (ref.current && stream) {
      ref.current.srcObject = stream;
      const playPromise = ref.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name === 'NotAllowedError') {
            setPlayError(true);
          }
        });
      }
    }
  }, [stream]);
  
  return (
    <div className="w-full h-full flex items-center justify-center bg-white dark:bg-slate-900 rounded-3xl shadow-soft dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-med-sand dark:border-slate-700 overflow-hidden relative transition-colors duration-700">
       <video ref={ref} autoPlay playsInline muted={muted} controls={!isHost} className="w-full h-full object-contain" />

       {playError && (
         <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
           <button 
             onClick={() => {
               ref.current.play();
               setPlayError(false);
             }}
             className="px-8 py-4 bg-med-ocean text-white rounded-full font-bold text-xl shadow-[0_0_20px_rgba(2,132,199,0.5)] hover:bg-med-navy transition-all hover:scale-105 active:scale-95"
           >
             ▶ Tap to Play Video
           </button>
           <p className="text-white/80 mt-4 font-medium px-6 text-center">Your browser blocked autoplay. You can also use the video controls below.</p>
         </div>
       )}
    </div>
  );
}
