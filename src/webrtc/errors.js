export class ConnectionFailedError extends Error { constructor() { super('Connection Failed'); this.name = 'ConnectionFailedError'; } }
export class NegotiationError extends Error { constructor() { super('Negotiation Error'); this.name = 'NegotiationError'; } }
export class ICEError extends Error { constructor() { super('ICE Error'); this.name = 'ICEError'; } }
