import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders Font Awesome icons before the four navigation link labels', () => {
    // Acceptance Criteria: AC2, AC3, AC4, AC5
    render(<Nav />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const teamLink = screen.getByRole('link', { name: /our team/i });
    const projectsLink = screen.getByRole('link', { name: /projects/i });
    const blogLink = screen.getByRole('link', { name: /blog/i });

    const homeIcon = within(homeLink).getByLabelText('Home icon');
    const teamIcon = within(teamLink).getByLabelText('Our team icon');
    const projectsIcon = within(projectsLink).getByLabelText('Projects icon');
    const blogIcon = within(blogLink).getByLabelText('Blog icon');

    expect(homeIcon).toHaveClass('nav-icon');
    expect(teamIcon).toHaveClass('nav-icon');
    expect(projectsIcon).toHaveClass('nav-icon');
    expect(blogIcon).toHaveClass('nav-icon');

    // Icons are positioned before text (DOM order inside the <a>)
    expect(homeLink.firstElementChild).toBe(homeIcon);
    expect(teamLink.firstElementChild).toBe(teamIcon);
    expect(projectsLink.firstElementChild).toBe(projectsIcon);
    expect(blogLink.firstElementChild).toBe(blogIcon);

    // Sanity check: exactly four nav icons exist (search has none).
    const nav = screen.getByRole('navigation');
    expect(nav.querySelectorAll('ul svg')).toHaveLength(4);
  });

  it('keeps the search form unchanged and does not add an icon to it', () => {
    // Acceptance Criteria: AC6, AC9
    render(<Nav />);

    const searchBox = screen.getByRole('searchbox', {
      name: /search the entire website/i,
    });
    expect(searchBox).toHaveAttribute('placeholder', 'Search query');

    const searchForm = searchBox.closest('form');
    expect(searchForm).not.toBeNull();
    expect(searchForm?.className).toContain('search');
    expect(searchForm?.querySelectorAll('svg')).toHaveLength(0);

    expect(screen.getByRole('button', { name: /go!/i })).toBeInTheDocument();
  });
});

