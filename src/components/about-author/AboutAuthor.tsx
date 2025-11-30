import React from 'react';
import { CommentSection } from '../comment-section/CommentSection.tsx';

export const AboutAuthor: React.FC = () => {
  return (
    <>
      <aside>
        <h3>About the author</h3>
        <p>Evan Wild is an unemployed plumber from Doncaster...</p>
      </aside>

      <CommentSection />
    </>
  );
};
