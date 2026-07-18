import { loadEnvironment } from '../config/index.js';

export async function fetchTurnServers() {
  const env = loadEnvironment();
  if (!env.meteredApiKey || !env.meteredAppName) return [];
  
  try {
    const response = await fetch(`https://${env.meteredAppName}.metered.live/api/v1/turn/credentials?apiKey=${env.meteredApiKey}`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch TURN credentials, falling back to STUN-only', error);
    return [];
  }
}
