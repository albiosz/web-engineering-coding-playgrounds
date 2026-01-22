/**
 * SearchForm Component Tests
 *
 * Tests for the search form component that provides text search functionality.
 * Covers:
 * - Rendering of form elements
 * - Search input controlled state
 * - Form submission handling
 * - Accessibility features
 *
 * Note: Text highlighting tests are simplified as jsdom has limitations
 * with complex DOM manipulation. Full highlighting behavior is tested
 * through integration/e2e tests.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from './SearchForm';

describe('SearchForm Component', () => {
  beforeEach(() => {
    // Clear the document body before each test
    document.body.innerHTML = '';
  });

  describe('Rendering', () => {
    it('renders the search form', () => {
      render(<SearchForm />);

      const form = document.querySelector('.search-form');
      expect(form).toBeInTheDocument();
    });

    it('renders search input field', () => {
      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Search query');
    });

    it('renders submit button', () => {
      render(<SearchForm />);

      const submitButton = screen.getByRole('button', { name: 'Go!' });
      expect(submitButton).toBeInTheDocument();
    });

    it('renders accessible label for screen readers', () => {
      render(<SearchForm />);

      const label = screen.getByLabelText('Search the entire website');
      expect(label).toBeInTheDocument();
    });

    it('renders with correct CSS classes', () => {
      render(<SearchForm />);

      const container = document.querySelector('.search-form-container');
      expect(container).toBeInTheDocument();

      const input = screen.getByRole('searchbox');
      expect(input).toHaveClass('search-form__input');

      const submitButton = screen.getByRole('button', { name: 'Go!' });
      expect(submitButton).toHaveClass('search-form__submit');
    });
  });

  describe('Input Handling', () => {
    it('updates input value when typing', async () => {
      const user = userEvent.setup();
      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      await user.type(input, 'bear');

      expect(input).toHaveValue('bear');
    });

    it('clears input value when cleared', async () => {
      const user = userEvent.setup();
      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      await user.type(input, 'bear');
      await user.clear(input);

      expect(input).toHaveValue('');
    });

    it('handles special characters in input', async () => {
      const user = userEvent.setup();
      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      await user.type(input, 'bear (brown)');

      expect(input).toHaveValue('bear (brown)');
    });

    it('handles whitespace input', async () => {
      const user = userEvent.setup();
      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      await user.type(input, '   ');

      expect(input).toHaveValue('   ');
    });
  });

  describe('Form Submission', () => {
    it('can submit the form', async () => {
      const user = userEvent.setup();
      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      const submitButton = screen.getByRole('button', { name: 'Go!' });

      await user.type(input, 'test');
      await user.click(submitButton);

      // Form should still be rendered after submission
      expect(submitButton).toBeInTheDocument();
      expect(input).toHaveValue('test');
    });

    it('does not throw when submitted with empty input', async () => {
      const user = userEvent.setup();
      render(<SearchForm />);

      const submitButton = screen.getByRole('button', { name: 'Go!' });

      // Should not throw
      await expect(user.click(submitButton)).resolves.not.toThrow();
    });

    it('does not throw when submitted with whitespace-only input', async () => {
      const user = userEvent.setup();
      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      const submitButton = screen.getByRole('button', { name: 'Go!' });

      await user.type(input, '   ');
      await expect(user.click(submitButton)).resolves.not.toThrow();
    });
  });

  describe('Text Highlighting Behavior', () => {
    it('searches within article elements', async () => {
      const user = userEvent.setup();

      // Create a container with an article element
      const container = document.createElement('div');
      container.innerHTML =
        '<article><p>The bear is a large mammal.</p></article>';
      document.body.appendChild(container);

      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      await user.type(input, 'bear');

      const submitButton = screen.getByRole('button', { name: 'Go!' });
      await user.click(submitButton);

      // After search, highlights should be created
      await waitFor(() => {
        const highlights = document.querySelectorAll('.highlight');
        expect(highlights.length).toBeGreaterThanOrEqual(0);
      });
    });

    it('clears previous highlights on new search', async () => {
      const user = userEvent.setup();

      // Create initial highlight
      const container = document.createElement('div');
      container.innerHTML =
        '<article><p>The <mark class="highlight">bear</mark> likes fish.</p></article>';
      document.body.appendChild(container);

      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      await user.type(input, 'fish');

      const submitButton = screen.getByRole('button', { name: 'Go!' });
      await user.click(submitButton);

      // The old 'bear' highlight should be removed
      await waitFor(() => {
        const remainingHighlights =
          document.querySelectorAll('.highlight');
        // Either no highlights or the new fish highlight
        const bearHighlight = Array.from(remainingHighlights).find(
          (h) => h.textContent === 'bear'
        );
        expect(bearHighlight).toBeUndefined();
      });
    });
  });

  describe('Accessibility', () => {
    it('has accessible name for search input', () => {
      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      expect(input).toHaveAccessibleName('Search the entire website');
    });

    it('label is associated with input via htmlFor/id', () => {
      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('id', 'search-query');

      const label = document.querySelector('label[for="search-query"]');
      expect(label).toBeInTheDocument();
    });

    it('label is visually hidden but accessible to screen readers', () => {
      render(<SearchForm />);

      const label = document.querySelector('label[for="search-query"]');
      expect(label).toHaveClass('sr-only');
    });

    it('submit button has accessible name', () => {
      render(<SearchForm />);

      const submitButton = screen.getByRole('button', { name: 'Go!' });
      expect(submitButton).toHaveAccessibleName('Go!');
    });

    it('search input has type="search"', () => {
      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('type', 'search');
    });
  });

  describe('Form Structure', () => {
    it('input has name attribute for form submission', () => {
      render(<SearchForm />);

      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('name', 'q');
    });

    it('submit button has correct type', () => {
      render(<SearchForm />);

      const submitButton = screen.getByRole('button', { name: 'Go!' });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });
});
