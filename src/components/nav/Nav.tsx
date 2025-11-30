import { useState } from 'react';

export const Nav: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetPreviousHighlights();

    const searchForm = e.target as HTMLFormElement;
    if (!searchForm) {
      console.error('Target element not found');
      return;
    }

    // replaced `this` with `e.target` because `this` is not the form element when using an arrow function instead of a normal function
    const searchKey = searchForm.q.value.trim();
    if (!searchKey) return;

    const regex = new RegExp(
      '(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')',
      'gi'
    );

    const walk = (node: Node) => {
      if (!node?.nodeType) {
        console.error('Node value not found');
        return;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        // Text node
        const textNode = node as Text;
        if (!textNode.nodeValue) {
          console.error('Node value not found');
          return;
        }

        const match = textNode.nodeValue.match(regex);
        if (match) {
          const span: Element = document.createElement('span');
          span.innerHTML = textNode.nodeValue.replace(
            regex,
            '<mark class="highlight">$1</mark>'
          );
          (node as Text).replaceWith.apply(node, Array.from(span.childNodes)); // Array.from() is used to convert the NodeList<ChildNode> to ChildNode[]
        }
        return;
      }

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

    const articles = document.querySelectorAll('article');
    articles.forEach(walk);
  };

  const resetPreviousHighlights = () => {
    document.querySelectorAll('.highlight').forEach((el: Element) => {
      const parent = el.parentNode;
      if (!parent) {
        console.error('Parent element not found');
        return;
      }
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
  };

  return (
    <nav>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Our team</a>
        </li>
        <li>
          <a href="#">Projects</a>
        </li>
        <li>
          <a href="#">Blog</a>
        </li>
      </ul>

      <form className="search" onSubmit={handleSearchSubmit}>
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
        />
        <input type="submit" value="Go!" />
      </form>
    </nav>
  );
};
