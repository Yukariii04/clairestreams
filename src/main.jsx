import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { initFirebase } from './firebase/index.js';

// Wait for Firebase to initialize and authenticate before rendering
initFirebase().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}).catch(err => {
  console.error("Failed to start application:", err);
  document.getElementById('root').innerHTML = `<div style="color:red; padding:20px; text-align:center;">Failed to start application: ${err.message}</div>`;
});
