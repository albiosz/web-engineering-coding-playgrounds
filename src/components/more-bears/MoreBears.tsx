import React, { useEffect, useState } from 'react';
import { fetchBearData } from './bearDataFetcher';
import type { BearData } from './bearDataFetcher';
import { Bear } from './Bear';

export const MoreBears: React.FC = () => {
  const [bears, setBears] = useState<BearData[]>([]);

  // https://react.dev/reference/react/useEffect#fetching-data-with-effects
  useEffect(() => {
    fetchBearData().then(setBears);
  }, []);

  return (
    <section className="more_bears">
      <h3>More Bears</h3>
      {bears.map((bear) => (
        <Bear key={bear.name} {...bear} />
      ))}
    </section>
  );
};
