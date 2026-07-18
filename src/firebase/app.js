import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { loadEnvironment } from '../config/index.js';

let app;
let database;

export function initFirebase() {
  if (app) return;
  const env = loadEnvironment();
  app = initializeApp({
    apiKey: env.firebaseApiKey,
    databaseURL: env.firebaseDatabaseUrl,
    projectId: env.firebaseProjectId,
  });
  database = getDatabase(app);
}

export function getDb() {
  if (!database) initFirebase();
  return database;
}
