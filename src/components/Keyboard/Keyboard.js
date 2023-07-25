import React from "react";

const keys = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m'],
];

function Keyboard({ letterStatuses }) {
  return (
    <div className="keyboard">
      {keys.map((keyRow, index) => (
        <div key={index} className="keyboard-row">
          {keyRow.map(key => {
            const letter = letterStatuses.find(({ letter }) => letter === key.toUpperCase());
            return (
              <div key={key} className={['keyboard-key', letter?.status].join(' ')}>{key}</div>
            )
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
