import { InitializationError, ConfigurationError, SessionError } from './errors.js';

export const generateUUID = () => crypto.randomUUID();
export const getTimestamp = () => Date.now();
export const logger = {
  info: (...args) => console.log('[INFO]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
};

export { InitializationError, ConfigurationError, SessionError };
