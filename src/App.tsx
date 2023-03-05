import React, { useEffect, useRef, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import { TableObject } from './Types/TableObject';
import { digits, Message } from './utils/utils';

export const App = () => {
  const [query, setQuery] = useState('');
  const [secretNumber, setSecretNumber] = useState<string[]>([]);
  const [startAgain, setStartAgain] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const baseGenerator = digits.sort(() => Math.random() - 0.5);
    const generatedNumber = baseGenerator.slice(0, 4).join('').split('');
    setSecretNumber(generatedNumber)
  }, [startAgain]);

  const attempts: TableObject[] = [];

  const handleComparisom = (secretNumber: string[], userInput: string) => {
    let cows = 0;
    let bulls = 0;
    const secret = secretNumber;
    const input = userInput.split('');

    let obj = {
      cows: 0,
      bulls: 0,
      input: userInput,
    }

    if (secret.every((element, i) => element === input[i])) {
      setStartAgain((state) => !state);
      setQuery('');
      return alert(Message.WINMESSAGE);
    }

    for (let i = 0; i < secret.length; i++) {
      if (secret[i] !== input[i] && input.includes(secret[i])) {
        cows++;
        obj.cows = cows;
      } else if (secret[i] === input[i]) {
        bulls++;
        obj.bulls = bulls;
      }

      return (obj);
    }

    attempts.push(obj);

    return attempts;
  };

  function testDigits(n: string) {
    for (let i = 0; i < n.length; i++) {
      if (n[i] === n[i + 1]) {
        return false;
      }

      return true;
    }
  }

  const handlerGoButton = () => {
    if (query.length < 4) {
      setQuery('');
      return alert(Message.NOTENOUGHDIGITS);
    }

    const userInput = query;

    if (userInput.toLocaleLowerCase() !== userInput.toLocaleUpperCase()) {
      setQuery('');
      return alert(Message.NOLETTERS);
    }

    if (!testDigits(query)) {
      setQuery('');
      return alert(Message.NOREPETITIONS);
    }

    handleComparisom(secretNumber, userInput);
    setQuery('');
  }

  return (
    <div className="App">
      <h1 className="title">Bulls and Cows</h1>
      <h2 className="subtitle">Instructions</h2>
      <p>1. Every digit should be different.</p>
      <p>2. Only numbers, no letters.</p>
      <p>3. the input must be 4 digits only.</p>
      <form onSubmit={(event) => {
        event.preventDefault();
        handlerGoButton();
      }} >
        <input
          type="text"
          className="input is-small"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          maxLength={4}
          ref={inputRef}
        />
      </form>
      <button
        className="button is-success"
        onClick={handlerGoButton}
      >
        Go!
      </button>
      <button
        className="button is-warning"
      >
        Give Up!
      </button>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Input</th>
              <th>Bull</th>
              <th>Cow</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt) => (
              <tr>
                <td>
                  {attempt.input}
                </td>
                <td>
                  {attempt.bulls}
                </td>
                <td>
                  {attempt.cows}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <img
        src="https://simkl.in/episodes/25/2571028ebaf098bf2_w.jpg"
        className="cowPic"
        alt="Cow"
      />
    </div>
  );
}

export default App;
