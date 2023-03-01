import React, { useEffect, useState } from 'react';
import './App.css';
import { ErrorMessages } from './utils/utils';

const randomNumber = () => Math.floor(Math.random() * 9000 + 1000).toString();

export const App = () => {
  const[query, setQuery] = useState('');
  const[inputError, setInputError] = useState('');
  const[secretNumb, setSecretNumb] = useState('');

  useEffect(() => {
    setSecretNumb(randomNumber());
  }, []);

  const handlerGoButton = () => {
    if (query.length === 4) {
      const userInput = query.toString().split('');

      if (userInput.every((digit) => typeof digit !== 'number')) {
        setInputError(ErrorMessages.NOLETTERS);
        return;
      }

      if (userInput.length !== new Set(userInput).size) {
        setInputError(ErrorMessages.NOREPETITIONS)
        return;
      } else {
        // compare userInput === secretNumb
      }
    }

    return setInputError(ErrorMessages.NOTENOUGHDIGITS);
  };

  return (
    <div className="App">
      <p>Instructions:</p>
      <span>Every digit should be different</span>
   <form onInput={(event) => {
    event.preventDefault();
   }} >
    <input
      type="text"
      className='input'
      value={query}
      onChange={(event) => {
        setQuery(event.target.value);
      }}
      maxLength={4}
    />
   </form>
   <button
    className='button'
    onClick={handlerGoButton}
  >
    Go!
  </button>
   <button
    className='button'
  >
    Give Up!
  </button>
    </div>
  );
}

export default App;
