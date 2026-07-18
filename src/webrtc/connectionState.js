export const states = { IDLE: 'IDLE', CONNECTING: 'CONNECTING', CONNECTED: 'CONNECTED', DISCONNECTED: 'DISCONNECTED', FAILED: 'FAILED' };
export const state = {
  status: states.IDLE,
  peer: null,
  channel: null,
  remoteStream: null
};
