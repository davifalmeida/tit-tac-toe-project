import React from 'react';

interface BoardProps {
  squares: string[];
  onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }): React.ReactElement => (
  <div>
    {[0, 1, 2].map(row => (
      <div key={row} className="board-row">
        {[0, 1, 2].map(col => {
          const index = 3 * row + col;
          return (
            <button
              key={index}
              className="square"
              onClick={(): void => onClick(index)}
            >
              {squares[index]}
            </button>
          );
        })}
      </div>
    ))}
  </div>
);

export default Board;
