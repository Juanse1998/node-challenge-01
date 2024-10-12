import React, { useState, useEffect } from 'react';
import GamesList from './components/GamesList.jsx';
import MovesList from './components/MovesList.jsx';
import Board from './components/Board.jsx';

const App = () => {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedGameMoves, setSelectedGameMoves] = useState([]);
  const [board, setBoard] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [fromPosition, setFromPosition] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/matches/');
        const data = await response.json();
        setGames(data.games);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchGames();
  }, []);

  // Función para actualizar el tablero
  const updateBoard = (newBoard) => {
    console.log('BOARD', newBoard)
    setBoard(newBoard);
  };

  // Función para agregar un movimiento a la lista
  const addMoveToList = (move) => {
    setSelectedGameMoves((prevMoves) => [...prevMoves, move]);
  };

  // Función para manejar el clic en las celdas del tablero
  const handleCellClick = async (rowIndex, colIndex) => {
    const piece = board[rowIndex][colIndex]; // Obtener la pieza en la celda clickeada

    if (selectedPiece) {
      // Si hay una pieza seleccionada, intenta moverla
      const to = { x: colIndex, y: rowIndex };
      const moveData = {
        piece: selectedPiece,
        from: fromPosition,
        to,
        gameId: selectedGameId,
      };

      const response = await sendMove(moveData);
      if (response) {
        // Si el movimiento es exitoso, actualiza el tablero y la lista de movimientos
        const updatedBoard = board.map((row) => [...row]); // Crea una copia del tablero
        updatedBoard[fromPosition.y][fromPosition.x] = ' '; // Limpia la posición de origen
        updatedBoard[to.y][to.x] = selectedPiece; // Coloca la pieza en la nueva posición

        updateBoard(updatedBoard);
        
        // Agrega el movimiento a la lista
        addMoveToList({
          piece: selectedPiece,
          fromX: fromPosition.x,
          fromY: fromPosition.y,
          toX: colIndex,
          toY: rowIndex,
        });
      }

      // Reinicia la selección
      setSelectedPiece(null);
      setFromPosition(null);
    } else {
      // Si no hay pieza seleccionada, selecciona la pieza actual
      if (piece !== ' ') {
        setSelectedPiece(piece);
        setFromPosition({ x: colIndex, y: rowIndex });
      }
    }
  };

  // Función para enviar el movimiento al servidor
  const sendMove = async (moveData) => {
    try {
      const response = await fetch('http://localhost:3000/api/moves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moveData),
      });
      if (!response.ok) throw new Error('Error en el movimiento');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null; // Retorna null si hay un error
    }
  };

  return (
    <div className="App">
      <h1>Partidas de Ajedrez</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <GamesList games={games} />
      </div>
      {selectedGameId && (
        <>
          <Board
            board={board}
            onCellClick={handleCellClick} // Pasa la función para manejar clics en celdas
            gameId={selectedGameId}
            updateBoard={updateBoard}
            addMoveToList={addMoveToList}
          />
          <MovesList moves={selectedGameMoves} />
        </>
      )}
    </div>
  );
};

export default App;
