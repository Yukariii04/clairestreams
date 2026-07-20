import { ref, onValue, set, push, onChildAdded } from 'firebase/database';
import { getDb } from './app.js';

export function subscribeSignaling(sessionId, role, callbacks) {
  const db = getDb();
  const { onOffer, onAnswer, onIceCandidate } = callbacks;
  
  if (role === 'viewer' && onOffer) {
    const offerRef = ref(db, `sessions/${sessionId}/signaling/offer`);
    onValue(offerRef, (snapshot) => {
      const val = snapshot.val();
      if (val) onOffer(val);
    });
  } else if (role === 'host' && onAnswer) {
    const answerRef = ref(db, `sessions/${sessionId}/signaling/answer`);
    onValue(answerRef, (snapshot) => {
      const val = snapshot.val();
      if (val) onAnswer(val);
    });
  }
  
  const remoteRole = role === 'host' ? 'viewer' : 'host';
  const candidatesRef = ref(db, `sessions/${sessionId}/signaling/${remoteRole}Candidates`);
  
  onChildAdded(candidatesRef, (snapshot) => {
    const val = snapshot.val();
    if (val && onIceCandidate) onIceCandidate(val);
  });
}

export async function writeOffer(sessionId, sdp) {
  const db = getDb();
  const offerRef = ref(db, `sessions/${sessionId}/signaling/offer`);
  await set(offerRef, sdp);
}

export async function writeAnswer(sessionId, sdp) {
  const db = getDb();
  const answerRef = ref(db, `sessions/${sessionId}/signaling/answer`);
  await set(answerRef, sdp);
}

export async function pushIceCandidate(sessionId, role, candidate) {
  const db = getDb();
  const candidatesRef = ref(db, `sessions/${sessionId}/signaling/${role}Candidates`);
  const newCandidateRef = push(candidatesRef);
  await set(newCandidateRef, JSON.parse(JSON.stringify(candidate)));
}

export async function clearSignaling(sessionId) {
  const db = getDb();
  await set(ref(db, `sessions/${sessionId}/signaling`), null);
}
