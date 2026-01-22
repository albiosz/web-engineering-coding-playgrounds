/**
 * Sidebar Component Tests
 *
 * Tests for the collapsible left sidebar navigation component.
 * Covers:
 * - Rendering of navigation items with icons
 * - Collapse/expand toggle functionality
 * - localStorage persistence of collapsed state
 * - Active page highlighting
 * - Accessibility attributes
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar';

// Storage key constant (must match the one in Sidebar.tsx)
const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed';

describe('Sidebar Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('Rendering', () => {
    it('renders the sidebar component', () => {
      render(<Sidebar />);

      const sidebar = screen.getByRole('navigation', {
        name: 'Main navigation',
      });
      expect(sidebar).toBeInTheDocument();
    });

    it('renders all navigation items', () => {
      render(<Sidebar />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Our team')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
    });

    it('renders navigation links with correct href', () => {
      render(<Sidebar />);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(4);
      links.forEach((link) => {
        expect(link).toHaveAttribute('href', '#');
      });
    });

    it('renders toggle button', () => {
      render(<Sidebar />);

      const toggleButton = screen.getByRole('button', {
        name: /collapse sidebar|expand sidebar/i,
      });
      expect(toggleButton).toBeInTheDocument();
    });

    it('renders icons for each navigation item', () => {
      render(<Sidebar />);

      // Icons should be present with aria-hidden for accessibility
      const icons = document.querySelectorAll('.sidebar__icon');
      expect(icons).toHaveLength(4);
      icons.forEach((icon) => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('Toggle Functionality', () => {
    it('starts in expanded state by default', () => {
      render(<Sidebar />);

      const sidebar = screen.getByRole('navigation', {
        name: 'Main navigation',
      });
      expect(sidebar).not.toHaveClass('sidebar--collapsed');
    });

    it('toggles to collapsed state when toggle button is clicked', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      const toggleButton = screen.getByRole('button', {
        name: 'Collapse sidebar',
      });
      await user.click(toggleButton);

      const sidebar = screen.getByRole('navigation', {
        name: 'Main navigation',
      });
      expect(sidebar).toHaveClass('sidebar--collapsed');
    });

    it('toggles back to expanded state when clicked again', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      const toggleButton = screen.getByRole('button', {
        name: /collapse sidebar/i,
      });

      // Click to collapse
      await user.click(toggleButton);
      let sidebar = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(sidebar).toHaveClass('sidebar--collapsed');

      // Click to expand
      const expandButton = screen.getByRole('button', {
        name: /expand sidebar/i,
      });
      await user.click(expandButton);
      sidebar = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(sidebar).not.toHaveClass('sidebar--collapsed');
    });

    it('updates aria-expanded attribute when toggling', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      const toggleButton = screen.getByRole('button', {
        name: 'Collapse sidebar',
      });
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

      await user.click(toggleButton);

      const expandButton = screen.getByRole('button', {
        name: 'Expand sidebar',
      });
      expect(expandButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('localStorage Persistence', () => {
    it('saves collapsed state to localStorage when toggled', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      const toggleButton = screen.getByRole('button', {
        name: 'Collapse sidebar',
      });
      await user.click(toggleButton);

      expect(localStorage.getItem(SIDEBAR_COLLAPSED_KEY)).toBe('true');
    });

    it('saves expanded state to localStorage when toggled back', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      const toggleButton = screen.getByRole('button', {
        name: 'Collapse sidebar',
      });

      // Collapse
      await user.click(toggleButton);
      expect(localStorage.getItem(SIDEBAR_COLLAPSED_KEY)).toBe('true');

      // Expand
      const expandButton = screen.getByRole('button', {
        name: 'Expand sidebar',
      });
      await user.click(expandButton);
      expect(localStorage.getItem(SIDEBAR_COLLAPSED_KEY)).toBe('false');
    });

    it('initializes with collapsed state from localStorage', () => {
      // Set localStorage before rendering
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, 'true');

      render(<Sidebar />);

      const sidebar = screen.getByRole('navigation', {
        name: 'Main navigation',
      });
      expect(sidebar).toHaveClass('sidebar--collapsed');
    });

    it('initializes with expanded state when localStorage is empty', () => {
      render(<Sidebar />);

      const sidebar = screen.getByRole('navigation', {
        name: 'Main navigation',
      });
      expect(sidebar).not.toHaveClass('sidebar--collapsed');
    });

    it('handles invalid localStorage value gracefully', () => {
      // Set invalid JSON in localStorage
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, 'invalid-json');

      // Should not throw and should default to expanded
      expect(() => render(<Sidebar />)).not.toThrow();

      const sidebar = screen.getByRole('navigation', {
        name: 'Main navigation',
      });
      expect(sidebar).not.toHaveClass('sidebar--collapsed');
    });
  });

  describe('Active Page Highlighting', () => {
    it('sets Home as active by default', () => {
      render(<Sidebar />);

      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toHaveClass('sidebar__link--active');
    });

    it('changes active state when navigation item is clicked', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      const blogLink = screen.getByText('Blog').closest('a');
      expect(blogLink).not.toHaveClass('sidebar__link--active');

      await user.click(blogLink!);

      expect(blogLink).toHaveClass('sidebar__link--active');

      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).not.toHaveClass('sidebar__link--active');
    });

    it('only one item is active at a time', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      // Click through multiple items
      await user.click(screen.getByText('Our team'));
      await user.click(screen.getByText('Projects'));
      await user.click(screen.getByText('Blog'));

      const activeLinks = document.querySelectorAll('.sidebar__link--active');
      expect(activeLinks).toHaveLength(1);

      const blogLink = screen.getByText('Blog').closest('a');
      expect(blogLink).toHaveClass('sidebar__link--active');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA role for navigation', () => {
      render(<Sidebar />);

      const sidebar = screen.getByRole('navigation', {
        name: 'Main navigation',
      });
      expect(sidebar).toBeInTheDocument();
    });

    it('toggle button has descriptive aria-label', () => {
      render(<Sidebar />);

      const toggleButton = screen.getByRole('button', {
        name: 'Collapse sidebar',
      });
      expect(toggleButton).toHaveAttribute('aria-label', 'Collapse sidebar');
    });

    it('navigation links have title attributes for tooltips', () => {
      render(<Sidebar />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('title');
      });
    });

    it('icons are hidden from screen readers', () => {
      render(<Sidebar />);

      const icons = document.querySelectorAll('.sidebar__icon');
      icons.forEach((icon) => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});
