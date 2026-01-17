import React, { useState, useId, useCallback } from 'react';
import './comment-section.css';

export interface Comment {
  id: string;
  name: string;
  text: string;
  timestamp: Date;
  upvotes: number;
}

interface CommentSectionProps {
  initialComments?: Comment[];
}

/**
 * Validates comment form input
 * @param name - User name
 * @param text - Comment text
 * @returns Whether the input is valid
 */
export const isValidComment = (name: string, text: string): boolean => {
  return name.trim().length > 0 && text.trim().length > 0;
};

/**
 * Formats a date as relative time (e.g., "2 hours ago")
 * @param date - Date to format
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
};

export const CommentSection: React.FC<CommentSectionProps> = ({
  initialComments,
}) => {
  const formId = useId();

  const defaultComments: Comment[] = [
    {
      id: 'comment-1',
      name: 'Bob Fossil',
      text: 'Oh I am so glad you taught me all about the big brown angry guys. They are so fascinating and I never knew they could be so diverse!',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      upvotes: 5,
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>(
    initialComments ?? defaultComments
  );
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (isValidComment(name, comment)) {
        const newComment: Comment = {
          id: `comment-${Date.now()}`,
          name: name.trim(),
          text: comment.trim(),
          timestamp: new Date(),
          upvotes: 0,
        };

        setComments((prevComments) => [...prevComments, newComment]);
        setName('');
        setComment('');
        setShowSuccess(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }
    },
    [name, comment]
  );

  const handleUpvote = useCallback((commentId: string) => {
    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === commentId ? { ...c, upvotes: c.upvotes + 1 } : c
      )
    );
  }, []);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    []
  );

  const handleCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
    },
    []
  );

  const isFormValid = isValidComment(name, comment);

  return (
    <section className="comment-section" aria-labelledby={`${formId}-heading`}>
      <h2 id={`${formId}-heading`} className="sr-only">
        Comment Section
      </h2>

      <button
        className="comment-section__toggle"
        onClick={toggleVisibility}
        aria-expanded={isVisible}
        aria-controls={`${formId}-content`}
      >
        <span className="comment-section__toggle-icon" aria-hidden="true">
          {isVisible ? '−' : '+'}
        </span>
        {isVisible ? 'Hide comments' : 'Show comments'}
      </button>

      {isVisible && (
        <div
          id={`${formId}-content`}
          className="comment-section__content"
          role="region"
          aria-label="Comments"
        >
          {/* Comment Form */}
          <div className="comment-form">
            <h3 className="comment-form__title" id={`${formId}-form-heading`}>
              Add a Comment
            </h3>
            <form
              className="comment-form__form"
              onSubmit={handleSubmit}
              aria-labelledby={`${formId}-form-heading`}
            >
              <div className="comment-form__field">
                <label className="comment-form__label" htmlFor={`${formId}-name`}>
                  Your name
                </label>
                <input
                  className="comment-form__input"
                  type="text"
                  name="name"
                  id={`${formId}-name`}
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleNameChange}
                  aria-required="true"
                  autoComplete="name"
                />
              </div>
              <div className="comment-form__field">
                <label className="comment-form__label" htmlFor={`${formId}-comment`}>
                  Your comment
                </label>
                <textarea
                  className="comment-form__input comment-form__input--textarea"
                  name="comment"
                  id={`${formId}-comment`}
                  placeholder="Share your thoughts about bears..."
                  value={comment}
                  onChange={handleCommentChange}
                  aria-required="true"
                  rows={4}
                />
              </div>
              <div className="comment-form__actions">
                <button
                  type="submit"
                  className="comment-form__submit"
                  disabled={!isFormValid}
                  aria-disabled={!isFormValid}
                >
                  Submit Comment
                </button>
              </div>
            </form>
          </div>

          {/* Comments List */}
          <div className="comment-list">
            <h3 className="comment-list__title" id={`${formId}-comments-heading`}>
              Comments
              <span className="comment-list__count" aria-label={`${comments.length} comments`}>
                ({comments.length})
              </span>
            </h3>

            {comments.length === 0 ? (
              <p className="comment-list__empty">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              <ul
                className="comment-list__container"
                aria-labelledby={`${formId}-comments-heading`}
              >
                {comments.map((commentItem) => (
                  <li key={commentItem.id} className="comment-card">
                    <article className="comment-card__content">
                      <header className="comment-card__header">
                        <span className="comment-card__author">{commentItem.name}</span>
                        <time
                          className="comment-card__timestamp"
                          dateTime={commentItem.timestamp.toISOString()}
                        >
                          {formatRelativeTime(commentItem.timestamp)}
                        </time>
                      </header>
                      <p className="comment-card__text">{commentItem.text}</p>
                      <footer className="comment-card__footer">
                        <button
                          className="comment-card__upvote"
                          onClick={() => handleUpvote(commentItem.id)}
                          aria-label={`Upvote comment by ${commentItem.name}. Current upvotes: ${commentItem.upvotes}`}
                        >
                          <span className="comment-card__upvote-icon" aria-hidden="true">
                            ▲
                          </span>
                          <span className="comment-card__upvote-count">
                            {commentItem.upvotes}
                          </span>
                        </button>
                      </footer>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div
              className="comment-section__success"
              role="status"
              aria-live="polite"
            >
              <span className="comment-section__success-icon" aria-hidden="true">
                ✓
              </span>
              Your comment has been added successfully!
            </div>
          )}
        </div>
      )}
    </section>
  );
};
