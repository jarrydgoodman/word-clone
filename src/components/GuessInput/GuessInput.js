import React from 'react';

function GuessInput({ addGuess, disabled }) {
  const [input, setInput] = React.useState('');

  return (
    <form
      className="guess-input-wrapper"
      onSubmit={e => {
        e.preventDefault();
        addGuess(input);
        setInput('');
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        pattern="^[a-zA-Z]{5}$"
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={disabled}
      />
    </form>
  );
}

export default GuessInput;
