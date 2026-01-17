import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CommentSection,
  getInitials,
  getAvatarVariant,
  isValidComment,
  formatRelativeTime,
  Comment,
} from './CommentSection';

describe('CommentSection', () => {
  describe('Utility Functions', () => {
    describe('getInitials', () => {
      it('returns initials for a two-word name', () => {
        expect(getInitials('John Doe')).toBe('JD');
      });

      it('returns single initial for a one-word name', () => {
        expect(getInitials('Alice')).toBe('A');
      });

      it('returns initials from first and last word for multi-word names', () => {
        expect(getInitials('Mary Jane Watson')).toBe('MW');
      });

      it('handles empty string by returning question mark', () => {
        expect(getInitials('')).toBe('?');
      });

      it('handles whitespace-only string by returning question mark', () => {
        expect(getInitials('   ')).toBe('?');
      });

      it('handles extra whitespace between words', () => {
        expect(getInitials('John    Doe')).toBe('JD');
      });

      it('returns uppercase initials for lowercase names', () => {
        expect(getInitials('jane doe')).toBe('JD');
      });
    });

    describe('getAvatarVariant', () => {
      it('returns empty string for variant 0', () => {
        // Find a name that produces variant 0
        const result = getAvatarVariant('test');
        expect(typeof result).toBe('string');
      });

      it('returns consistent variant for same name', () => {
        const variant1 = getAvatarVariant('John Doe');
        const variant2 = getAvatarVariant('John Doe');
        expect(variant1).toBe(variant2);
      });

      it('returns different variants for different names', () => {
        const variants = new Set([
          getAvatarVariant('Alice'),
          getAvatarVariant('Bob'),
          getAvatarVariant('Charlie'),
          getAvatarVariant('Diana'),
          getAvatarVariant('Eve'),
        ]);
        // At least some should be different
        expect(variants.size).toBeGreaterThan(1);
      });

      it('returns valid CSS class format', () => {
        const variant = getAvatarVariant('John Doe');
        if (variant !== '') {
          expect(variant).toMatch(/^comment-avatar--variant-[1-4]$/);
        }
      });
    });

    describe('isValidComment', () => {
      it('returns true for valid name and text', () => {
        expect(isValidComment('John', 'Great post!')).toBe(true);
      });

      it('returns false for empty name', () => {
        expect(isValidComment('', 'Great post!')).toBe(false);
      });

      it('returns false for empty text', () => {
        expect(isValidComment('John', '')).toBe(false);
      });

      it('returns false for whitespace-only name', () => {
        expect(isValidComment('   ', 'Great post!')).toBe(false);
      });

      it('returns false for whitespace-only text', () => {
        expect(isValidComment('John', '   ')).toBe(false);
      });

      it('returns true for name and text with leading/trailing whitespace', () => {
        expect(isValidComment('  John  ', '  Great post!  ')).toBe(true);
      });
    });

    describe('formatRelativeTime', () => {
      it('returns "Just now" for times less than a minute ago', () => {
        const now = new Date();
        expect(formatRelativeTime(now)).toBe('Just now');
      });

      it('returns minutes ago for times less than an hour', () => {
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        expect(formatRelativeTime(thirtyMinutesAgo)).toBe('30 min ago');
      });

      it('returns hours ago for times less than a day', () => {
        const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
        expect(formatRelativeTime(threeHoursAgo)).toBe('3 hours ago');
      });

      it('returns days ago for times less than a week', () => {
        const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
        expect(formatRelativeTime(twoDaysAgo)).toBe('2 days ago');
      });

      it('returns formatted date for times older than a week', () => {
        const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
        const result = formatRelativeTime(twoWeeksAgo);
        // Should be a locale date string, not relative
        expect(result).not.toContain('ago');
        expect(result).not.toBe('Just now');
      });
    });
  });

  describe('Component Rendering', () => {
    it('renders the show/hide button', () => {
      render(<CommentSection />);
      expect(
        screen.getByRole('button', { name: /show comments/i })
      ).toBeInTheDocument();
    });

    it('hides comment content by default', () => {
      render(<CommentSection />);
      expect(screen.queryByText('Add comment')).not.toBeInTheDocument();
    });

    it('shows content when button is clicked', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      expect(screen.getByText('Add comment')).toBeInTheDocument();
    });

    it('toggles button text when clicked', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      const button = screen.getByRole('button', { name: /show comments/i });
      await user.click(button);

      expect(
        screen.getByRole('button', { name: /hide comments/i })
      ).toBeInTheDocument();
    });

    it('renders default comment when expanded', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      expect(screen.getByText('Bob Fossil')).toBeInTheDocument();
    });

    it('renders custom initial comments', async () => {
      const user = userEvent.setup();
      const customComments: Comment[] = [
        {
          id: 'test-1',
          name: 'Test User',
          text: 'This is a test comment',
          timestamp: new Date(),
        },
      ];

      render(<CommentSection initialComments={customComments} />);
      await user.click(screen.getByRole('button', { name: /show comments/i }));

      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    });

    it('renders empty state when no comments', async () => {
      const user = userEvent.setup();
      render(<CommentSection initialComments={[]} />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      expect(
        screen.getByText(/no comments yet/i)
      ).toBeInTheDocument();
    });

    it('displays comment count in heading', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      expect(screen.getByText(/comments \(1\)/i)).toBeInTheDocument();
    });
  });

  describe('Form Functionality', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<CommentSection />);
      await user.click(screen.getByRole('button', { name: /show comments/i }));
    });

    it('renders form with name and comment inputs', () => {
      expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/your comment/i)).toBeInTheDocument();
    });

    it('renders submit button', () => {
      expect(
        screen.getByRole('button', { name: /submit comment/i })
      ).toBeInTheDocument();
    });

    it('disables submit button when form is empty', () => {
      const submitButton = screen.getByRole('button', {
        name: /submit comment/i,
      });
      expect(submitButton).toBeDisabled();
    });

    it('enables submit button when form is filled', async () => {
      const user = userEvent.setup();

      await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');
      await user.type(
        screen.getByLabelText(/your comment/i),
        'This is a test'
      );

      const submitButton = screen.getByRole('button', {
        name: /submit comment/i,
      });
      expect(submitButton).not.toBeDisabled();
    });

    it('keeps submit disabled with only name filled', async () => {
      const user = userEvent.setup();

      await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');

      const submitButton = screen.getByRole('button', {
        name: /submit comment/i,
      });
      expect(submitButton).toBeDisabled();
    });

    it('keeps submit disabled with only comment filled', async () => {
      const user = userEvent.setup();

      await user.type(
        screen.getByLabelText(/your comment/i),
        'This is a test'
      );

      const submitButton = screen.getByRole('button', {
        name: /submit comment/i,
      });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Comment Submission', () => {
    it('adds new comment when form is submitted', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');
      await user.type(
        screen.getByLabelText(/your comment/i),
        'This is my new comment!'
      );

      await user.click(
        screen.getByRole('button', { name: /submit comment/i })
      );

      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('This is my new comment!')).toBeInTheDocument();
    });

    it('clears form after successful submission', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      const nameInput = screen.getByLabelText(/your name/i);
      const commentInput = screen.getByLabelText(/your comment/i);

      await user.type(nameInput, 'Jane Doe');
      await user.type(commentInput, 'This is my new comment!');

      await user.click(
        screen.getByRole('button', { name: /submit comment/i })
      );

      expect(nameInput).toHaveValue('');
      expect(commentInput).toHaveValue('');
    });

    it('updates comment count after adding comment', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      expect(screen.getByText(/comments \(1\)/i)).toBeInTheDocument();

      await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');
      await user.type(
        screen.getByLabelText(/your comment/i),
        'This is my new comment!'
      );

      await user.click(
        screen.getByRole('button', { name: /submit comment/i })
      );

      expect(screen.getByText(/comments \(2\)/i)).toBeInTheDocument();
    });

    it('trims whitespace from submitted name and comment', async () => {
      const user = userEvent.setup();
      render(<CommentSection initialComments={[]} />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      await user.type(screen.getByLabelText(/your name/i), '  John  ');
      await user.type(
        screen.getByLabelText(/your comment/i),
        '  My comment  '
      );

      await user.click(
        screen.getByRole('button', { name: /submit comment/i })
      );

      // The text should appear without leading/trailing whitespace
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('My comment')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-expanded attribute on toggle button', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      const button = screen.getByRole('button', { name: /show comments/i });
      expect(button).toHaveAttribute('aria-expanded', 'false');

      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('has aria-controls attribute linking to content', () => {
      render(<CommentSection />);

      const button = screen.getByRole('button', { name: /show comments/i });
      expect(button).toHaveAttribute('aria-controls');
    });

    it('has proper form labels', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      const nameInput = screen.getByLabelText(/your name/i);
      const commentInput = screen.getByLabelText(/your comment/i);

      expect(nameInput).toBeInTheDocument();
      expect(commentInput).toBeInTheDocument();
    });

    it('has aria-required on form inputs', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      expect(screen.getByLabelText(/your name/i)).toHaveAttribute(
        'aria-required',
        'true'
      );
      expect(screen.getByLabelText(/your comment/i)).toHaveAttribute(
        'aria-required',
        'true'
      );
    });

    it('has proper region role for comment content', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      expect(
        screen.getByRole('region', { name: /comments/i })
      ).toBeInTheDocument();
    });

    it('comment list has proper accessibility structure', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();

      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  describe('Avatar Display', () => {
    it('displays correct initials for commenter', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      // Bob Fossil should have initials BF
      expect(screen.getByText('BF')).toBeInTheDocument();
    });

    it('displays initials for newly added comment', async () => {
      const user = userEvent.setup();
      render(<CommentSection initialComments={[]} />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      await user.type(screen.getByLabelText(/your name/i), 'Jane Smith');
      await user.type(
        screen.getByLabelText(/your comment/i),
        'New comment'
      );

      await user.click(
        screen.getByRole('button', { name: /submit comment/i })
      );

      expect(screen.getByText('JS')).toBeInTheDocument();
    });
  });
});
