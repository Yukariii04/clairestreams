export function loadEnvironment() {
  return {
    firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    firebaseDatabaseUrl: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    firebaseProjectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    meteredApiKey: import.meta.env.VITE_METERED_API_KEY,
    meteredAppName: import.meta.env.VITE_METERED_APP_NAME
  };
}
