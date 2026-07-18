export class InitializationError extends Error { constructor(m) { super(m); this.name = 'InitializationError'; } }
export class ConfigurationError extends Error { constructor(m) { super(m); this.name = 'ConfigurationError'; } }
export class SessionError extends Error { constructor(m) { super(m); this.name = 'SessionError'; } }
