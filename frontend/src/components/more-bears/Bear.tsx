import React from 'react';
import type { BearData } from './bearDataFetcher';

export const Bear: React.FC<BearData> = ({ name, binomial, image, range }) => {
  return (
    <div className="bear">
      <img
        src={image}
        alt={`Image of ${name}`}
        style={{ width: '200px', height: 'auto' }}
      />
      <p>
        <b>{name}</b> ({binomial})
      </p>
      <p>Range: {range}</p>
    </div>
  );
};
