import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CommentSection,
  isValidComment,
  formatRelativeTime,
  Comment,
} from './CommentSection';

describe('CommentSection', () => {
  describe('Utility Functions', () => {
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
      expect(screen.queryByText(/add a comment/i)).not.toBeInTheDocument();
    });

    it('shows content when button is clicked', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      expect(screen.getByText(/add a comment/i)).toBeInTheDocument();
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
          upvotes: 0,
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

      expect(screen.getByText(/no comments yet/i)).toBeInTheDocument();
    });

    it('displays comment count in heading', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      expect(screen.getByText('(1)')).toBeInTheDocument();
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

      expect(screen.getByText('(1)')).toBeInTheDocument();

      await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');
      await user.type(
        screen.getByLabelText(/your comment/i),
        'This is my new comment!'
      );

      await user.click(
        screen.getByRole('button', { name: /submit comment/i })
      );

      expect(screen.getByText('(2)')).toBeInTheDocument();
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

    it('new comment starts with zero upvotes', async () => {
      const user = userEvent.setup();
      render(<CommentSection initialComments={[]} />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');
      await user.type(screen.getByLabelText(/your comment/i), 'New comment');

      await user.click(
        screen.getByRole('button', { name: /submit comment/i })
      );

      // Check the upvote button shows 0
      const upvoteButton = screen.getByRole('button', {
        name: /upvote comment by jane doe/i,
      });
      expect(upvoteButton).toHaveTextContent('0');
    });
  });

  describe('Success Message', () => {
    it('displays success message after submitting a comment', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      await user.type(screen.getByLabelText(/your name/i), 'Test User');
      await user.type(screen.getByLabelText(/your comment/i), 'Test comment');
      await user.click(screen.getByRole('button', { name: /submit comment/i }));

      expect(
        screen.getByText(/your comment has been added successfully/i)
      ).toBeInTheDocument();
    });

    it('success message has correct role for accessibility', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      await user.type(screen.getByLabelText(/your name/i), 'Test User');
      await user.type(screen.getByLabelText(/your comment/i), 'Test comment');
      await user.click(screen.getByRole('button', { name: /submit comment/i }));

      const successMessage = screen.getByRole('status');
      expect(successMessage).toBeInTheDocument();
      expect(successMessage).toHaveAttribute('aria-live', 'polite');
    });

    it('success message disappears after 3 seconds', () => {
      vi.useFakeTimers();
      render(<CommentSection />);

      // Use fireEvent to avoid timer issues with userEvent
      fireEvent.click(screen.getByRole('button', { name: /show comments/i }));

      fireEvent.change(screen.getByLabelText(/your name/i), {
        target: { value: 'Test User' },
      });
      fireEvent.change(screen.getByLabelText(/your comment/i), {
        target: { value: 'Test comment' },
      });
      fireEvent.click(screen.getByRole('button', { name: /submit comment/i }));

      expect(
        screen.getByText(/your comment has been added successfully/i)
      ).toBeInTheDocument();

      // Fast-forward 3 seconds
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(
        screen.queryByText(/your comment has been added successfully/i)
      ).not.toBeInTheDocument();

      vi.useRealTimers();
    });
  });

  describe('Upvote Functionality', () => {
    it('displays upvote count for each comment', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      // Default comment has 5 upvotes
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('increments upvote count when upvote button is clicked', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      const upvoteButton = screen.getByRole('button', {
        name: /upvote comment by bob fossil/i,
      });
      expect(upvoteButton).toHaveTextContent('5');

      await user.click(upvoteButton);
      expect(upvoteButton).toHaveTextContent('6');
    });

    it('allows multiple upvotes on the same comment', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      const upvoteButton = screen.getByRole('button', {
        name: /upvote comment by bob fossil/i,
      });

      await user.click(upvoteButton);
      await user.click(upvoteButton);
      await user.click(upvoteButton);

      expect(upvoteButton).toHaveTextContent('8');
    });

    it('upvote button has accessible label with current count', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      const upvoteButton = screen.getByRole('button', {
        name: /upvote comment by bob fossil.*current upvotes: 5/i,
      });
      expect(upvoteButton).toBeInTheDocument();
    });

    it('upvotes only the specific comment', async () => {
      const user = userEvent.setup();
      const customComments: Comment[] = [
        {
          id: 'test-1',
          name: 'User One',
          text: 'First comment',
          timestamp: new Date(),
          upvotes: 3,
        },
        {
          id: 'test-2',
          name: 'User Two',
          text: 'Second comment',
          timestamp: new Date(),
          upvotes: 7,
        },
      ];

      render(<CommentSection initialComments={customComments} />);
      await user.click(screen.getByRole('button', { name: /show comments/i }));

      const upvoteButton1 = screen.getByRole('button', {
        name: /upvote comment by user one/i,
      });
      const upvoteButton2 = screen.getByRole('button', {
        name: /upvote comment by user two/i,
      });

      expect(upvoteButton1).toHaveTextContent('3');
      expect(upvoteButton2).toHaveTextContent('7');

      await user.click(upvoteButton1);

      expect(upvoteButton1).toHaveTextContent('4');
      expect(upvoteButton2).toHaveTextContent('7');
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

    it('uses semantic article element for comments', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('uses time element with datetime attribute for timestamps', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      const timeElement = screen.getByRole('article').querySelector('time');
      expect(timeElement).toHaveAttribute('dateTime');
    });
  });

  describe('Comment Display without Avatars', () => {
    it('displays author name without avatar', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      // Author name should be visible
      expect(screen.getByText('Bob Fossil')).toBeInTheDocument();

      // No avatar initials should be displayed
      expect(screen.queryByText('BF')).not.toBeInTheDocument();
    });

    it('displays timestamp for comments', async () => {
      const user = userEvent.setup();
      render(<CommentSection />);

      await user.click(screen.getByRole('button', { name: /show comments/i }));

      // Should show relative time
      expect(screen.getByText(/1 days ago/)).toBeInTheDocument();
    });
  });
});
