import { deleteSession } from '../firebase/index.js';

export async function endSession(sessionId) {
  await deleteSession(sessionId);
}
