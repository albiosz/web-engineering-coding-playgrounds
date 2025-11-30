import { createRoot } from 'react-dom/client';
import { initSearchHighlighter } from './searchHighlighter.ts';
import { fetchBearData } from './bearDataFetcher.ts';

import { App } from './App.tsx';

initSearchHighlighter();
fetchBearData();

// Mount React component
const rootElement = document.getElementById('app');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
