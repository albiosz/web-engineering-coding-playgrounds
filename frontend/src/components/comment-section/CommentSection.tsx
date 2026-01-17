import React, { useState, useId, useCallback } from 'react';
import './comment-section.css';

export interface Comment {
  id: string;
  name: string;
  text: string;
  timestamp: Date;
}

interface CommentSectionProps {
  initialComments?: Comment[];
}

/**
 * Generates initials from a name string
 * @param name - Full name to extract initials from
 * @returns Up to 2 character initials
 */
export const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === '') return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Gets a consistent avatar variant based on the name
 * @param name - Name to generate variant for
 * @returns Variant class name (0-4)
 */
export const getAvatarVariant = (name: string): string => {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variant = hash % 5;
  if (variant === 0) return '';
  return `comment-avatar--variant-${variant}`;
};

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
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>(
    initialComments ?? defaultComments
  );
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

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
        };

        setComments((prevComments) => [...prevComments, newComment]);
        setName('');
        setComment('');
      }
    },
    [name, comment]
  );

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
    <section className="comments" aria-labelledby={`${formId}-heading`}>
      <h2 id={`${formId}-heading`} className="sr-only">
        Comment Section
      </h2>

      <button
        className="show-hide"
        onClick={toggleVisibility}
        aria-expanded={isVisible}
        aria-controls={`${formId}-content`}
      >
        <span aria-hidden="true">{isVisible ? '▼' : '▶'}</span>
        {isVisible ? 'Hide comments' : 'Show comments'}
      </button>

      {isVisible && (
        <div
          id={`${formId}-content`}
          className="comment-wrapper"
          role="region"
          aria-label="Comments"
        >
          <h2 id={`${formId}-form-heading`}>Add comment</h2>
          <form
            className="comment-form"
            onSubmit={handleSubmit}
            aria-labelledby={`${formId}-form-heading`}
          >
            <div className="flex-pair">
              <label htmlFor={`${formId}-name`}>Your name</label>
              <input
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
            <div className="flex-pair">
              <label htmlFor={`${formId}-comment`}>Your comment</label>
              <textarea
                name="comment"
                id={`${formId}-comment`}
                placeholder="Share your thoughts about bears..."
                value={comment}
                onChange={handleCommentChange}
                aria-required="true"
                rows={4}
              />
            </div>
            <div>
              <input
                type="submit"
                value="Submit comment"
                disabled={!isFormValid}
                aria-disabled={!isFormValid}
              />
            </div>
          </form>

          <h2 id={`${formId}-comments-heading`}>
            Comments {comments.length > 0 && `(${comments.length})`}
          </h2>

          {comments.length === 0 ? (
            <p className="comment-empty">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            <ul
              className="comment-container"
              aria-labelledby={`${formId}-comments-heading`}
            >
              {comments.map((commentItem) => (
                <li key={commentItem.id} className="comment-card">
                  <div className="comment-header">
                    <div
                      className={`comment-avatar ${getAvatarVariant(commentItem.name)}`}
                      aria-hidden="true"
                    >
                      {getInitials(commentItem.name)}
                    </div>
                    <div className="comment-meta">
                      <p className="comment-author">{commentItem.name}</p>
                      <time
                        className="comment-time"
                        dateTime={commentItem.timestamp.toISOString()}
                      >
                        {formatRelativeTime(commentItem.timestamp)}
                      </time>
                    </div>
                  </div>
                  <p className="comment-text">{commentItem.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};
