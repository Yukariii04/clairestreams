import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { joinSession, endSession } from '../session/index.js';
import { startCapture, stopCapture, isCapturing } from '../capture/index.js';
import { createPeer, attachStream, disconnect, getConnectionState } from '../webrtc/index.js';

import { Navbar } from '../components/Navbar.jsx';
import { VideoPlayer } from '../components/VideoPlayer.jsx';
import { Chat } from '../components/Chat.jsx';

import { BackgroundEffects } from '../components/BackgroundEffects.jsx';

export default function Session() {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const isHost = searchParams.get('role') === 'host';
  const navigate = useNavigate();

  const [status, setStatus] = useState('INITIALIZING');
  const [rtcStatus, setRtcStatus] = useState('IDLE');
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [notification, setNotification] = useState('');

  const captureStarted = useRef(false);
  const capturePromise = useRef(null);
  const prevViewer = useRef(false);

  useEffect(() => {
    let active = true;

    async function initHost() {
      try {
        if (!capturePromise.current) {
          capturePromise.current = startCapture();
        }
        const st = await capturePromise.current;
        if (!active) return;
        setStream(st);
        captureStarted.current = true;
        await createPeer(sessionId, null, st);
        setStatus('WAITING');
      } catch (err) {
        setError('Capture failed: ' + err.message);
      }
    }

    async function initViewer() {
      try {
        await joinSession(sessionId);
        if (!active) return;
        setStatus('WAITING');
        await createPeer(sessionId, setStream);
      } catch (err) {
        setError(err.message);
      }
    }

    if (isHost) initHost();
    else initViewer();

    import('../firebase/index.js').then(({ subscribeSession }) => {
      const unsub = subscribeSession(sessionId, (s) => {
        if (s) {
          setSessionData(s);
          setStatus(s.status);
          if (s.status === 'ENDED') setError('Session Ended by Host');
          
          if (isHost && captureStarted.current && !isCapturing() && s.status !== 'ENDED') {
             handleEnd();
          }
        } else {
          setError('Invalid Session');
        }
      });
      if (!active) unsub();
      else window.claireUnsub = unsub;
    });

    const int = setInterval(() => {
      setRtcStatus(getConnectionState());
    }, 1000);

    return () => {
      active = false;
      clearInterval(int);
      if (window.claireUnsub) window.claireUnsub();
      if (!isHost) disconnect();
    };
  }, [sessionId, isHost]);

  useEffect(() => {
    if (!isHost || !sessionData) return;
    if (sessionData.viewerConnected !== prevViewer.current) {
      setNotification(sessionData.viewerConnected ? 'Guest connected' : 'Guest left');
      const t = setTimeout(() => setNotification(''), 3000);
      prevViewer.current = sessionData.viewerConnected;
      return () => clearTimeout(t);
    }
  }, [sessionData?.viewerConnected, isHost]);

  const handleEnd = () => {
    if (isHost) {
      stopCapture();
      endSession(sessionId);
    } else {
      import('../firebase/index.js').then(({ updateSession, cancelViewerDisconnectHook }) => {
        updateSession(sessionId, { viewerConnected: false, status: 'WAITING' });
        if (cancelViewerDisconnectHook) cancelViewerDisconnectHook(sessionId);
      });
    }
    disconnect();
    navigate('/');
  };

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-med-cream dark:bg-slate-950 text-med-navy dark:text-slate-100 font-sans p-6 text-center transition-colors duration-700">
      <div className="text-red-400 dark:text-red-500 text-5xl mb-4">✿</div>
      <h2 className="text-2xl font-serif font-semibold mb-8 text-red-900 dark:text-red-400">{error}</h2>
      <button onClick={() => navigate('/')} className="px-8 py-3 bg-white dark:bg-slate-800 hover:bg-med-sand dark:hover:bg-slate-700 rounded-xl font-medium transition-colors border border-med-sand dark:border-slate-700 shadow-sm text-med-navy dark:text-slate-200">Return to Journal</button>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#fdf4db] dark:bg-slate-950 font-sans text-med-navy dark:text-slate-100 overflow-hidden transition-colors duration-700 relative">
      <BackgroundEffects />
      {/* ponytail: lazy minimal overlay for notifications instead of a heavy toast library */}
      {notification && <div className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-med-navy dark:bg-slate-800 text-white rounded-full z-50 shadow-md transition-opacity animate-fade-in">{notification}</div>}
      <Navbar isHost={isHost} rtcStatus={(!sessionData?.viewerConnected && isHost) ? 'WAITING' : rtcStatus} onEnd={handleEnd} sessionId={sessionId} />
      <div className="flex flex-1 overflow-hidden relative z-10">
        <div className="absolute inset-0 bg-med-sky/30 dark:bg-slate-900/50 pointer-events-none transition-colors duration-700"></div>
        <div className="absolute inset-0 opacity-[0.03] dark:invert dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="flex-1 relative flex flex-col p-6 z-10">
          {stream ? (
            <VideoPlayer stream={stream} muted={isHost} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <div className="w-12 h-12 border-4 border-med-ocean dark:border-blue-400 border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="font-hand text-3xl text-med-ocean dark:text-blue-300 animate-pulse -rotate-2">{isHost ? 'Waiting for guests to arrive...' : 'Waiting for the broadcast to begin...'}</p>
            </div>
          )}
        </div>
        <Chat sessionId={sessionId} isHost={isHost} />
      </div>
    </div>
  );
}
