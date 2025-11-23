// Import search highlighter module
import { initSearchHighlighter } from './searchHighlighter.ts';
import { fetchBearData } from './bearDataFetcher.ts';
import './components/comment-section/comment-section.ts';

initSearchHighlighter();
fetchBearData();
