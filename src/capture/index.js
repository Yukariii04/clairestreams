import { startCapture } from './startCapture.js';
import { stopCapture } from './stopCapture.js';
import { state, states } from './streamState.js';

export function getStream() {
  return state.stream;
}

export function isCapturing() {
  return state.status === states.CAPTURING;
}

export { startCapture, stopCapture };
