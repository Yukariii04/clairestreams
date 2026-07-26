import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { loadEnvironment } from '../config/index.js';

let app;
let database;
let auth;
let initPromise = null;

export function initFirebase() {
  if (initPromise) return initPromise;
  
  const env = loadEnvironment();
  app = initializeApp({
    apiKey: env.firebaseApiKey,
    databaseURL: env.firebaseDatabaseUrl,
    projectId: env.firebaseProjectId,
  });
  
  database = getDatabase(app);
  auth = getAuth(app);
  
  initPromise = signInAnonymously(auth).catch(err => {
    console.error("Firebase auth failed:", err);
    throw err;
  });
  
  return initPromise;
}

export function getDb() {
  if (!database) {
    throw new Error('Firebase not initialized. Call and await initFirebase() first.');
  }
  return database;
}
