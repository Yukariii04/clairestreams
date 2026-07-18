import { useEffect, useRef } from 'react';

export function VideoPlayer({ stream }) {
  const ref = useRef();
  useEffect(() => { if (ref.current && stream) ref.current.srcObject = stream; }, [stream]);
  
  return (
    <div className="w-full h-full flex items-center justify-center bg-white dark:bg-slate-900 rounded-3xl shadow-soft dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-med-sand dark:border-slate-700 overflow-hidden relative transition-colors duration-700">
       <video ref={ref} autoPlay className="w-full h-full object-contain" />
    </div>
  );
}
