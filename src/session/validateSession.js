import { states } from './sessionState.js';
import { InvalidSessionError, ExpiredSessionError } from './errors.js';
import { getSessionOnce, updateSession } from '../firebase/index.js';

export async function validateSession(sessionId) {
  const session = await getSessionOnce(sessionId);
  if (!session) throw new InvalidSessionError();
  if (Date.now() > session.expiresAt || session.status === states.EXPIRED) {
    await updateSession(sessionId, { status: states.EXPIRED });
    throw new ExpiredSessionError();
  }
  return session;
}
