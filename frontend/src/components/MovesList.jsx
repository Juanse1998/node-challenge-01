// components/ChessMoves.js
import React from 'react';

const MovesList = ({ moves }) => {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
  function toChessNotation(x, y) {
    const file = files[x]; 
    const rank = 8 - y;
    return `${file}${rank}`;
  }

  function isWhiteOrBlack(piece) {
    return piece === piece.toUpperCase() ? 'Blanco' : 'Negro';
  } 

  return (
    <div>
      <h2>Movimientos de la Partida</h2>
      <ol>
        {moves.map((move, index) => (  
          <li key={index}>
            {isWhiteOrBlack(move.piece)} de {toChessNotation(move.fromX, move.fromY)} a {toChessNotation(move.toX, move.toY)}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MovesList;
