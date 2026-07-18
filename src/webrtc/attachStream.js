import { state } from './connectionState.js';

export function attachStream(stream) {
  if (!state.peer || !stream) return;
  stream.getTracks().forEach(track => {
    state.peer.addTrack(track, stream);
  });
}
