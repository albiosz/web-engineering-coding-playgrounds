import React, { useState } from 'react';
import './comment-section.css';

interface Comment {
  name: string;
  text: string;
}

export const CommentSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      name: 'Bob Fossil',
      text: 'Oh I am so glad you taught me all about the big brown angry guys...',
    },
  ]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedComment = comment.trim();
    const canSubmit = trimmedName.length > 0 && trimmedComment.length > 0;

    if (canSubmit) {
      const newComment: Comment = {
        name: trimmedName,
        text: trimmedComment,
      };

      console.log(`New comment from ${trimmedName}: ${trimmedComment}`);

      setComments((prev) => [...prev, newComment]);
      setName('');
      setComment('');
    }
  };

  return (
    <section className="comments" aria-label="Comments">
      <div className="comments__header">
        <h2 className="comments__heading">Comments</h2>
        <button
          className="comments__toggle"
          type="button"
          onClick={toggleVisibility}
          aria-expanded={isVisible}
        >
          {isVisible ? 'Hide' : 'Show'} ({comments.length})
        </button>
      </div>

      {isVisible && (
        <div className="comments__panel">
          <form className="comments__form" onSubmit={handleSubmit}>
            <div className="comments__field">
              <label className="comments__label" htmlFor="name">
                Name
              </label>
              <input
                className="comments__input"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="comments__field">
              <label className="comments__label" htmlFor="comment">
                Comment
              </label>
              <textarea
                className="comments__textarea"
                name="comment"
                id="comment"
                placeholder="Write your comment..."
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="comments__actions">
              <button
                className="comments__submit"
                type="submit"
                disabled={!name.trim() || !comment.trim()}
              >
                Submit
              </button>
            </div>
          </form>

          <ul className="comments__list" aria-label="Comment list">
            {comments.map((c, index) => (
              <li key={`${c.name}-${index}`} className="comments__item">
                <div className="comments__itemHeader">
                  <span className="comments__avatar" aria-hidden="true">
                    {c.name.trim().slice(0, 1).toUpperCase()}
                  </span>
                  <span className="comments__author">{c.name}</span>
                </div>
                <p className="comments__text">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

