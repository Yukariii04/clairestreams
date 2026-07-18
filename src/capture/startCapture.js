import { state, states } from './streamState.js';
import { PermissionDeniedError, CaptureCancelledError, CaptureUnavailableError } from './errors.js';
import { stopCapture } from './stopCapture.js';

export async function startCapture() {
  if (state.stream) stopCapture();
  
  if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
    throw new CaptureUnavailableError();
  }

  state.status = states.REQUESTING_PERMISSION;

  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });
    
    state.stream = stream;
    state.status = states.CAPTURING;

    stream.getVideoTracks()[0].onended = () => {
      stopCapture();
    };

    return stream;
  } catch (err) {
    state.status = states.IDLE;
    if (err.name === 'NotAllowedError') throw new PermissionDeniedError();
    if (err.name === 'AbortError') throw new CaptureCancelledError();
    throw new CaptureUnavailableError();
  }
}
