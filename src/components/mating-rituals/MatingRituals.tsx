import React from 'react';

export const MatingRituals: React.FC = () => {
  return (
    <>
      <h3>Mating rituals</h3>
      <p>Bears are romantic creatures by nature...</p>
      <audio controls aria-describedby="bear-audio-description">
        <source src="media/bear.mp3" type="audio/mp3" />
        <source src="media/bear.ogg" type="audio/ogg" />
        <p>It looks like your browser doesn't support HTML5 audio players.</p>
      </audio>

      <details className="audio-description">
        <summary>Audio description for hearing impaired users</summary>
        <div id="bear-audio-description">
          <p>
            The audio contains deep, resonant grunting and growling sounds
            typical of bears during mating season. The sounds are low-frequency
            (50-200Hz), with varying intensity patterns lasting approximately 8
            seconds. These vocalizations help bears communicate their presence
            and readiness to mate.
          </p>
        </div>
      </details>
    </>
  );
};
