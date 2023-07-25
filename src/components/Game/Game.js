import React from 'react';

import { sample, range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput';
import Guess from '../Guess';
import { checkGuess } from '../../game-helpers';
import Keyboard from '../Keyboard';

const GUESS_GRID = range(NUM_OF_GUESSES_ALLOWED);

const STATUS_PRIORITY = {
  correct: 3,
  misplaced: 2,
  incorrect: 1,
  none: 0,
};

function Game() {
  const [answer, setAnswer] = React.useState(sample(WORDS));
  const [victory, setVictory] = React.useState();
  const [guesses, setGuesses] = React.useState([]);
  const [letterStatuses, setLetterStatuses] = React.useState([]);

  const addGuess = guess => {
    if (guesses.length >= NUM_OF_GUESSES_ALLOWED) return;

    // add guess
    const checkedGuess = checkGuess(guess, answer);
    const nextGuesses = [...guesses, checkedGuess]
    setGuesses(nextGuesses);

    // set victory state if needed
    if (checkedGuess.every(({ status }) => status === 'correct')) {
      setVictory(true);
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setVictory(false);
    }

    // update letter statuses
    const nextLetterStatuses = [...letterStatuses];
    checkedGuess.forEach(({ letter: guessLetter, status }) => {
      const currentStatus = nextLetterStatuses.find(({ letter }) => letter === guessLetter);
      if (!currentStatus) {
        nextLetterStatuses.push({ letter: guessLetter, status });
      } else if (currentStatus && STATUS_PRIORITY[currentStatus.status] < STATUS_PRIORITY[status]) {
        currentStatus.status = status;
      }
    });
    setLetterStatuses(nextLetterStatuses);
  };

  const restart = () => {
    setVictory(undefined);
    setGuesses([]);
    setLetterStatuses([]);
    setAnswer(sample(WORDS));
  };

  return (
    <>
      <div className="guess-results">
        {GUESS_GRID.map((_, index) => <Guess key={index} guess={guesses[index]} />)}
      </div>

      <GuessInput
        addGuess={addGuess}
        disabled={typeof victory !== 'undefined'}
      />

      <Keyboard letterStatuses={letterStatuses} />

      {victory === true && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{' '}
            <strong>{guesses.length} {guesses.length === 1 ? 'guess' : 'guesses'}</strong>.
          </p>

          <button className="restart" onClick={restart}>RESTART</button>
        </div>
      )}

      {victory === false && (
        <div className="sad banner">
          <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>

          <button className="restart" onClick={restart}>RESTART</button>
        </div>
      )}
    </>
  );
}

export default Game;
