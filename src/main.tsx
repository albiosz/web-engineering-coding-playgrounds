import { createRoot } from 'react-dom/client';
import { initSearchHighlighter } from './searchHighlighter.ts';
import { fetchBearData } from './bearDataFetcher.ts';
import { CommentSection } from './components/comment-section/CommentSection.tsx';

initSearchHighlighter();
fetchBearData();

// Mount React component
const commentSectionRoot = document.getElementById('comment-section-root');
if (commentSectionRoot) {
  const root = createRoot(commentSectionRoot);
  root.render(<CommentSection />);
}
