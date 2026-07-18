import { validateSession } from './validateSession.js';
import { ViewerLimitReachedError, HostDisconnectedError } from './errors.js';
import { states } from './sessionState.js';
import { updateSession } from '../firebase/index.js';

export async function joinSession(sessionId) {
  const session = await validateSession(sessionId);
  if (!session.hostConnected || session.status === states.ENDED) throw new HostDisconnectedError();
  if (session.viewerConnected) throw new ViewerLimitReachedError();
  
  await updateSession(sessionId, { viewerConnected: true, status: states.CONNECTED });
  return Object.freeze({ ...session, viewerConnected: true, status: states.CONNECTED });
}
