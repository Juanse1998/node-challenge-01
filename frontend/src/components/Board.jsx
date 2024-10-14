import React, { useState } from 'react';

const Board = ({ board, updateBoard, gameId, setSelectedGameMoves }) => {
  console.log({ board, updateBoard, gameId });

  const [selectedPiece, setSelectedPiece] = useState(null); // Estado para la pieza seleccionada
  const [fromPosition, setFromPosition] = useState(null);

  const sendMove = async (moveData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/match/${gameId}/moves`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moveData),
      });

      if (!response.ok) {
        throw new Error('Error en el movimiento');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const addMoveToList = (move) => {
    setSelectedGameMoves((prevMoves) => [...prevMoves, move]);
  };

  const handleCellClick = async (rowIndex, colIndex) => {
    const piece = board[rowIndex][colIndex];
  
    if (selectedPiece) {
      const to = { x: colIndex, y: rowIndex };
      const moveData = {
        piece: selectedPiece,
        from: fromPosition,
        to,
        gameId,
      };
  
      const response = await sendMove(moveData);
      console.log('aca', updateBoard);
      if (response) {
        const updatedBoard = board.map((row) => [...row]);
        updatedBoard[fromPosition.y][fromPosition.x] = ' ';
        updatedBoard[to.y][to.x] = selectedPiece;
        updateBoard(updatedBoard);
  
        const newMove = {
          piece: selectedPiece,
          fromX: fromPosition.x,
          fromY: fromPosition.y,
          toX: colIndex,
          toY: rowIndex,
        };
        setSelectedGameMoves((prevMoves) => [...prevMoves, newMove]);
        addMoveToList(newMove); 
      }
  
      setSelectedPiece(null);
      setFromPosition(null);
    } else {
      if (piece !== ' ') {
        setSelectedPiece(piece);
        setFromPosition({ x: colIndex, y: rowIndex });
      }
    }
  };

  const getPieceImage = (piece) => {
    if (piece === ' ') return null;

    const isWhite = piece === piece.toUpperCase();
    const pieceType = piece.toLowerCase();
    const colorPrefix = isWhite ? 'w' : '';

    return `/images/${colorPrefix}${pieceType}.svg`;
  };

  return (
    <div style={styles.container}>
      {/* Letras (a-h) en la parte superior */}
      <div style={styles.topLabels}>
        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((letter, index) => (
          <div key={index} style={styles.label}>{letter}</div>
        ))}
      </div>
  
      <div style={styles.boardContainer}>
        {/* Números (1-8) en el lado izquierdo - invertido */}
        <div style={styles.leftLabels}>
          {[8, 7, 6, 5, 4, 3, 2, 1].map((number, index) => (
            <div key={index} style={styles.label}>{number}</div>
          ))}
        </div>
  
        {/* Tablero de ajedrez */}
        <div style={styles.board}>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} style={styles.row}>
              {row.map((piece, colIndex) => {
                const backgroundColor = (rowIndex + colIndex) % 2 === 0 ? '#f0d9b5' : '#b58863';
  
                return (
                  <div
                    key={colIndex}
                    style={{ ...styles.cell, backgroundColor }}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {getPieceImage(piece) && (
                      <img
                        src={getPieceImage(piece)}
                        alt={piece}
                        style={styles.piece}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Estilos para el tablero, las celdas y la notación de ajedrez
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  topLabels: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    width: '400px',
    marginBottom: '5px',
  },
  leftLabels: {
    display: 'grid',
    gridTemplateRows: 'repeat(8, 1fr)',
    marginRight: '5px',
    height: '400px',
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    height: '100%',
  },
  boardContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridTemplateRows: 'repeat(8, 1fr)',
    gap: '1px',
    width: '400px',
    height: '400px',
    backgroundColor: '#000',
  },
  row: {
    display: 'contents',
  },
  cell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  piece: {
    width: '80%',
    height: '80%',
  },
};

export default Board;