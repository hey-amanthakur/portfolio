import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/globals.css';
import App from '@/App';

const container = document.getElementById('root');
if (container !== null) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Failed to locate active root mounting div in document DOM.');
}
