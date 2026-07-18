import { createPeer } from './createPeer.js';
import { attachStream } from './attachStream.js';
import { disconnect } from './disconnect.js';
import { state } from './connectionState.js';

export function getConnectionState() {
  return state.status;
}

export { createPeer, attachStream, disconnect };
