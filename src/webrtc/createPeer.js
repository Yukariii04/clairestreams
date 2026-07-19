import { state, states } from './connectionState.js';
import { fetchTurnServers, subscribeSignaling, writeOffer, writeAnswer, pushIceCandidate, subscribeSession } from '../firebase/index.js';

export async function createPeer(sessionId, onTrack, localStream) {
  if (state.peer) state.peer.close();
  
  const role = onTrack ? 'viewer' : 'host';
  
  const meteredIceServers = await fetchTurnServers();
  const iceServers = [
    { urls: 'stun:stun.l.google.com:19302' },
    ...meteredIceServers
  ];
  
  const peer = new RTCPeerConnection({ iceServers });
  
  state.peer = peer;
  if (localStream) {
    localStream.getTracks().forEach(track => {
      peer.addTrack(track, localStream);
    });
  }
  state.status = states.CONNECTING;
  
  peer.onicecandidate = e => {
    if (e.candidate) pushIceCandidate(sessionId, role, e.candidate).catch(err => console.error('ICE push err', err));
  };
  
  peer.ontrack = e => {
    state.remoteStream = e.streams[0];
    if (onTrack) onTrack(e.streams[0]);
  };
  
  peer.onconnectionstatechange = () => {
    const s = peer.connectionState;
    if (s === 'connected') state.status = states.CONNECTED;
    else if (s === 'disconnected' || s === 'closed') state.status = states.DISCONNECTED;
    else if (s === 'failed') state.status = states.FAILED;
  };

  const onOffer = async (sdp) => {
    try {
      await peer.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      await writeAnswer(sessionId, answer);
    } catch (e) { console.error('NegotiationError', e); }
  };
  
  const onAnswer = async (sdp) => {
    try {
      await peer.setRemoteDescription(new RTCSessionDescription(sdp));
    } catch (e) { console.error('NegotiationError', e); }
  };
  
  const onIceCandidate = (candidate) => {
    peer.addIceCandidate(new RTCIceCandidate(candidate)).catch(e => console.error('ICEError', e));
  };

  subscribeSignaling(sessionId, role, { onOffer, onAnswer, onIceCandidate });
  
  if (role === 'host') {
    let offerCreated = false;
    subscribeSession(sessionId, async (sessionVal) => {
      if (sessionVal && sessionVal.viewerConnected && !offerCreated) {
        offerCreated = true;
        try {
          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          await writeOffer(sessionId, offer);
        } catch (e) { console.error('NegotiationError', e); }
      }
    });
  }
  
  return peer;
}
