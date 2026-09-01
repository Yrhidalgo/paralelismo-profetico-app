import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("React mounting...");

const container = document.getElementById('root');
if (!container) {
  console.error("Critical: Root container not found!");
} else {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

