import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';

// Mount React component
const rootElement = document.getElementById('app');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
