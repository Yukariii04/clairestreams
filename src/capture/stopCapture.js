import { state, states } from './streamState.js';

export function stopCapture() {
  if (state.stream) {
    state.stream.getTracks().forEach(t => t.stop());
    state.stream = null;
  }
  state.status = states.STOPPED;
}
