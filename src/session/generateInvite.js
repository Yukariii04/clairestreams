export function generateInvite(sessionId) {
  return `${window.location.origin}/session/${sessionId}?role=viewer`;
}
