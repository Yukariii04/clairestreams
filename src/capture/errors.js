export class PermissionDeniedError extends Error { constructor() { super('Permission Denied'); this.name = 'PermissionDeniedError'; } }
export class CaptureCancelledError extends Error { constructor() { super('Capture Cancelled'); this.name = 'CaptureCancelledError'; } }
export class CaptureUnavailableError extends Error { constructor() { super('Capture Unavailable'); this.name = 'CaptureUnavailableError'; } }
