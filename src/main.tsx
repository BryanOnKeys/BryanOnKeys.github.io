import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/space-grotesk/wght.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import './styles/tokens.css';
import './styles/globals.css';
import './styles/contact.css';
import './styles/portfolio.css';
import './styles/technical.css';
import './styles/animations.css';
import App from './app/App';
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
