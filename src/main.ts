// Import search highlighter module
import { initSearchHighlighter } from './searchHighlighter.ts';
import {
  commentsSectionToggleManager,
  commentFormManager,
} from './commentsManager.ts';
import { fetchBearData } from './bearDataFetcher.ts';

initSearchHighlighter();

commentsSectionToggleManager();
commentFormManager();
fetchBearData();
