export class InvalidSessionError extends Error { constructor() { super('Invalid Session'); this.name = 'InvalidSessionError'; } }
export class ExpiredSessionError extends Error { constructor() { super('Session Expired'); this.name = 'ExpiredSessionError'; } }
export class ViewerLimitReachedError extends Error { constructor() { super('Viewer Limit Reached'); this.name = 'ViewerLimitReachedError'; } }
export class HostDisconnectedError extends Error { constructor() { super('Host Disconnected'); this.name = 'HostDisconnectedError'; } }
