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
    setIsVisible(!isVisible);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() && comment.trim()) {
      const newComment: Comment = {
        name: name,
        text: comment,
      };

      console.log(`New comment from ${name}: ${comment}`);

      setComments([...comments, newComment]);
      setName('');
      setComment('');
    }
  };

  return (
    <section className="comments">
      <button className="show-hide" onClick={toggleVisibility}>
        {isVisible ? 'Hide comments' : 'Show comments'}
      </button>

      {isVisible && (
        <div className="comment-wrapper">
          <h2>Add comment</h2>
          <form className="comment-form" onSubmit={handleSubmit}>
            <div className="flex-pair">
              <label htmlFor="name">Your name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex-pair">
              <label htmlFor="comment">Your comment:</label>
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="Enter your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div>
              <input type="submit" value="Submit comment" />
            </div>
          </form>

          <h2>Comments</h2>
          <ul className="comment-container">
            {comments.map((comment, index) => (
              <li key={index}>
                <p>{comment.name}</p>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

