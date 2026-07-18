import { ref, push, set, onChildAdded } from 'firebase/database';
import { getDb } from './app.js';

export function subscribeChat(sessionId, role, onMessageReceived) {
  const db = getDb();
  const chatRef = ref(db, `sessions/${sessionId}/chat`);
  
  const unsubscribe = onChildAdded(chatRef, (snapshot) => {
    const message = snapshot.val();
    if (message && message.sender !== role) {
      onMessageReceived(message);
    }
  });
  
  return unsubscribe;
}

export async function pushChatMessage(sessionId, sender, text) {
  const db = getDb();
  const chatRef = ref(db, `sessions/${sessionId}/chat`);
  const newMessageRef = push(chatRef);
  await set(newMessageRef, {
    sender,
    text,
    ts: Date.now()
  });
}
