import { state, states } from './connectionState.js';

export function disconnect() {
  if (state.peer) {
    state.peer.close();
    state.peer = null;
  }
  if (state.channel) {
    state.channel.close();
    state.channel = null;
  }
  state.status = states.DISCONNECTED;
  state.remoteStream = null;
}
