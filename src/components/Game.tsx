import React, { useState } from 'react';
import Board from './Board'
import calculateWinner from '../utils/calculateWinner';

const Game: React.FC = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number) => {
    const historyUntilCurrentStep = history.slice(0, stepNumber + 1);
    const current = historyUntilCurrentStep[historyUntilCurrentStep.length - 1];
    const squares = [...current];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...historyUntilCurrentStep, squares]);
    setStepNumber(historyUntilCurrentStep.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const moves = history.map((_step, move) => {
    const destination = move ? `Go to move #${move}` : 'Go to start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{destination}</button>
      </li>
    );
  });

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
