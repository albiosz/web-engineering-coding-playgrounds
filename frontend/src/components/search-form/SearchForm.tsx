import React, { useState, useCallback } from 'react';
import './search-form.css';

/**
 * SearchForm Component
 *
 * A search form component that provides text search functionality across the page.
 * Features:
 * - Text input for search queries
 * - Highlights matching text in article elements
 * - Clears previous highlights before performing new search
 * - Accessible with screen reader support
 *
 * @example
 * ```tsx
 * <SearchForm />
 * ```
 */
export const SearchForm: React.FC = () => {
  /**
   * Controlled state for search input value
   */
  const [searchQuery, setSearchQuery] = useState<string>('');

  /**
   * Handle input change event
   * Updates the searchQuery state with the current input value
   *
   * @param e - The change event from the input element
   */
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  /**
   * Reset all previously highlighted text on the page
   * Removes highlight marks and restores original text nodes
   */
  const resetPreviousHighlights = useCallback(() => {
    document.querySelectorAll('.highlight').forEach((el: Element) => {
      const parent = el.parentNode;
      if (!parent) {
        console.error('Parent element not found');
        return;
      }
      const textContent = el.textContent;
      if (textContent !== null) {
        parent.replaceChild(document.createTextNode(textContent), el);
        parent.normalize();
      }
    });
  }, []);

  /**
   * Handle form submission
   * Performs text search and highlights matching content in articles
   *
   * @param e - The form submission event
   */
  const handleSearchSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Clear any existing highlights before searching
      resetPreviousHighlights();

      // Use controlled state value instead of form element
      const searchKey = searchQuery.trim();
      if (!searchKey) return;

      // Create regex pattern for case-insensitive global matching
      // Escape special regex characters in the search query
      const regex = new RegExp(
        '(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')',
        'gi'
      );

      /**
       * Recursively walk through DOM nodes and highlight matching text
       *
       * @param node - The current DOM node to process
       */
      const walk = (node: Node) => {
        if (!node?.nodeType) {
          console.error('Node value not found');
          return;
        }

        // Process text nodes
        if (node.nodeType === Node.TEXT_NODE) {
          const textNode = node as Text;
          if (!textNode.nodeValue) {
            console.error('Node value not found');
            return;
          }

          const match = textNode.nodeValue.match(regex);
          if (match) {
            // Create a span with highlighted text
            const span: Element = document.createElement('span');
            span.innerHTML = textNode.nodeValue.replace(
              regex,
              '<mark class="highlight">$1</mark>'
            );
            // Replace the text node with the highlighted content
            (node as Text).replaceWith.apply(node, Array.from(span.childNodes));
          }
          return;
        }

        // Process element nodes (skip script, style, and form elements)
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          (node as Element).tagName !== 'SCRIPT' &&
          (node as Element).tagName !== 'STYLE' &&
          (node as Element).tagName !== 'FORM'
        ) {
          // Create a static NodeList to avoid issues with DOM changes during iteration
          const childNodes = Array.from(node.childNodes);
          childNodes.forEach(walk);
        }
      };

      // Apply highlighting to all article elements
      const articles = document.querySelectorAll('article');
      articles.forEach(walk);
    },
    [resetPreviousHighlights, searchQuery]
  );

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <label htmlFor="search-query" className="sr-only">
          Search the entire website
        </label>
        <input
          type="search"
          id="search-query"
          name="q"
          placeholder="Search query"
          onChange={handleSearchChange}
          value={searchQuery}
          className="search-form__input"
        />
        <input
          type="submit"
          value="Go!"
          className="search-form__submit"
        />
      </form>
    </div>
  );
};
