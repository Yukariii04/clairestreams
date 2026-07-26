import { ref, onValue, set, update, remove, get, onDisconnect } from 'firebase/database';
import { getDb } from './app.js';

export function subscribeSession(sessionId, callback, errorCallback) {
  const db = getDb();
  const sessionRef = ref(db, `sessions/${sessionId}`);
  const unsubscribe = onValue(sessionRef, (snapshot) => {
    callback(snapshot.val());
  }, (error) => {
    if (errorCallback) errorCallback(error);
    else console.error("Session subscription error:", error);
  });
  return unsubscribe;
}

export async function writeSession(sessionId, sessionData) {
  const db = getDb();
  const sessionRef = ref(db, `sessions/${sessionId}`);
  await set(sessionRef, sessionData);
}

export async function updateSession(sessionId, updates) {
  const db = getDb();
  const sessionRef = ref(db, `sessions/${sessionId}`);
  await update(sessionRef, updates);
}

export async function deleteSession(sessionId) {
  const db = getDb();
  const sessionRef = ref(db, `sessions/${sessionId}`);
  await remove(sessionRef);
}

export async function getSessionOnce(sessionId) {
  const db = getDb();
  const sessionRef = ref(db, `sessions/${sessionId}`);
  const snapshot = await get(sessionRef);
  return snapshot.val();
}

export function setViewerDisconnectHook(sessionId) {
  const db = getDb();
  const sessionRef = ref(db, `sessions/${sessionId}`);
  return onDisconnect(sessionRef).update({ viewerConnected: false, status: 'WAITING' });
}

export function cancelViewerDisconnectHook(sessionId) {
  const db = getDb();
  const sessionRef = ref(db, `sessions/${sessionId}`);
  return onDisconnect(sessionRef).cancel();
}

export function setHostDisconnectHook(sessionId) {
  const db = getDb();
  const sessionRef = ref(db, `sessions/${sessionId}`);
  return onDisconnect(sessionRef).remove();
}

export function cancelHostDisconnectHook(sessionId) {
  const db = getDb();
  const sessionRef = ref(db, `sessions/${sessionId}`);
  return onDisconnect(sessionRef).cancel();
}
