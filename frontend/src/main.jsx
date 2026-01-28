// TODO: Create main entry point for React application
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// TODO: Mount React app to DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
