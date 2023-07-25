import React from "react";

const EMPTY_GUESS_LETTERS = Array(5).fill({ letter: '', status: null });

function Guess({ guess }) {
  return (
    <p className="guess">
      {(guess || EMPTY_GUESS_LETTERS).map(({ letter, status }, index) => (
        <span
          key={index}
          className={['cell', ...(status ? [status] : [])].join(' ')}
        >
          {letter}
        </span>
      ))}
    </p>
  );
}

export default Guess;
