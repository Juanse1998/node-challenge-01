import React, { useState } from 'react';
import Board from './Board.jsx';
import MovesList from './MovesList.jsx';

const GamesList = ({ games }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [movesGame, setMovesGame] = useState([]);
  const [board, setBoard] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleSelectGame = async (gameId) => {
    const game = games.find((g) => g.id === gameId);
    setSelectedGame(game);

    if (game) {
      await fetchMoves(game.id);
      setBoard(JSON.parse(game.board));
    }
  };

  const fetchMoves = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/match/${gameId}/moves`);
      const data = await response.json();
      setMovesGame(data.moves || []);
    } catch (error) {
      console.log('Error fetching moves:', error);
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (!selectedPiece) {
      const piece = board[rowIndex][colIndex];
      if (piece !== ' ') {
        setSelectedPiece({ piece, rowIndex, colIndex });
      }
    } else {
      // Mueve la pieza seleccionada
      // VER ESTO
      const newBoard = board.map((row) => row.slice());
      newBoard[rowIndex][colIndex] = selectedPiece.piece;
      newBoard[selectedPiece.rowIndex][selectedPiece.colIndex] = ' ';

      setBoard(newBoard);
      setSelectedPiece(null);
    }
  };

  return (
    <div>
      <h2>Lista de Partidas</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <button onClick={() => handleSelectGame(game.id)}>
              Partida #{game.id} - {game.date}
            </button>
          </li>
        ))}
      </ul>

      {selectedGame && (
        <div>
          <h3>Partida {selectedGame.id}</h3>
          <b>Ganador: {selectedGame.result} </b>
          <Board board={board} gameId={selectedGame.id} onCellClick={handleCellClick} />
          <MovesList moves={movesGame} />
        </div>
      )}
    </div>
  );
};

export default GamesList;
