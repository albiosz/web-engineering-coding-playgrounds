import React, { useState } from 'react';
import './comment-section.css';

interface Comment {
  name: string;
  text: string;
  timestamp: Date;
}

// Helper function to get initials from a name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

// Helper function to format relative time
const formatRelativeTime = (date: Date): string => {
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

export const CommentSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      name: 'Bob Fossil',
      text: 'Oh I am so glad you taught me all about the big brown angry guys...',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
    },
  ]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() && comment.trim()) {
      const newComment: Comment = {
        name: name,
        text: comment,
        timestamp: new Date(),
      };

      console.log(`New comment from ${name}: ${comment}`);

      setComments([...comments, newComment]);
      setName('');
      setComment('');
    }
  };

  const commentCount = comments.length;

  return (
    <section className="comments" aria-label="Comment section">
      <button
        className="show-hide"
        onClick={toggleVisibility}
        aria-expanded={isVisible}
        aria-controls="comment-content"
      >
        <span className="show-hide-icon">{isVisible ? '−' : '+'}</span>
        <span className="show-hide-text">
          {isVisible ? 'Hide comments' : `Show comments (${commentCount})`}
        </span>
      </button>

      {isVisible && (
        <div id="comment-content" className="comment-wrapper">
          <div className="comment-form-card">
            <h2>Leave a comment</h2>
            <form className="comment-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="comment">Your comment</label>
                <textarea
                  name="comment"
                  id="comment"
                  placeholder="Share your thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  required
                  aria-required="true"
                />
              </div>
              <button type="submit" className="submit-btn">
                Post comment
              </button>
            </form>
          </div>

          <div className="comments-list-section">
            <h2>
              Comments{' '}
              <span className="comment-count">({commentCount})</span>
            </h2>
            <ul className="comment-container" role="list">
              {comments.map((commentItem, index) => (
                <li key={index} className="comment-card" role="listitem">
                  <div className="comment-avatar" aria-hidden="true">
                    {getInitials(commentItem.name)}
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">{commentItem.name}</span>
                      <time
                        className="comment-time"
                        dateTime={commentItem.timestamp.toISOString()}
                      >
                        {formatRelativeTime(commentItem.timestamp)}
                      </time>
                    </div>
                    <p className="comment-text">{commentItem.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

