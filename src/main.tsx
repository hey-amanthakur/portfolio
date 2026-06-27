import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/globals.css';
import App from '@/App';
import { ErrorBoundary } from '@components/ui/ErrorBoundary';

// Force dark mode on first paint unless the user explicitly chose light.
// This makes the terminal/CRT theme the default first impression.
try {
  const stored = window.localStorage.getItem('theme');
  if (stored !== 'light') {
    document.documentElement.classList.add('dark');
    if (stored === null) {
      window.localStorage.setItem('theme', 'dark');
    }
  }
} catch {
  document.documentElement.classList.add('dark');
}

const container = document.getElementById('root');
if (container !== null) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('Failed to locate active root mounting div in document DOM.');
}
