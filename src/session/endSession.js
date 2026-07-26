import { deleteSession, cancelHostDisconnectHook } from '../firebase/index.js';

export async function endSession(sessionId) {
  cancelHostDisconnectHook(sessionId);
  await deleteSession(sessionId);
}
