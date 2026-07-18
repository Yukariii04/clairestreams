import { states } from './sessionState.js';
import { generateUUID } from '../utils/index.js';
import { writeSession } from '../firebase/index.js';

export async function createSession() {
  const sessionId = generateUUID().split('-')[0].toUpperCase();
  const session = {
    sessionId,
    hostConnected: true,
    viewerConnected: false,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * 60 * 1000,
    status: states.WAITING
  };
  await writeSession(sessionId, session);
  return session;
}
