import React, { useState } from 'react';
import Board from './Board.jsx';
import MovesList from './MovesList.jsx';

import './styles.css';

const GamesList = ({ games, setGames }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [movesGame, setMovesGame] = useState([]);
  const [board, setBoard] = useState([]);


  const fetchMoves = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/match/${gameId}/moves`);
      const data = await response.json();
      setMovesGame(data.moves || []);
    } catch (error) {
      console.log('Error fetching moves:', error);
    }
  };

  const handleSelectGame = async (gameId) => {
    const game = games.find((g) => g.id === gameId);
    setSelectedGame(game);

    if (game) {
      await fetchMoves(game.id);
      setBoard(JSON.parse(game.board));
    }
  };

  const updateBoard = (newBoard) => {
    setBoard(newBoard);
  };


  const handleDeleteGame = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/matches/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const newGames = games.filter((e) => e.id !== id);
        setGames(newGames);
      }
    } catch (error) {
      console.log('Error fetching moves:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Partidas</h2>
      <ul className="list-none p-0">
        {games.map((game) => (
          <li key={game.id} className="mb-2">
            <button
              onClick={() => handleSelectGame(game.id)}
              className="bg-blue-500 text-white py-1 px-4 rounded mr-2 hover:bg-blue-600 transition"
            >
              VER PARTIDA - {game.id}
            </button>
            <button
              onClick={() => handleDeleteGame(game.id)}
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
            >
              Eliminar partida
            </button>
          </li>
        ))}
      </ul>

      {selectedGame && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Partida {selectedGame.id}</h3>
          <b>Ganador: {selectedGame.result}</b>
          <Board
            board={board}
            updateBoard={updateBoard}
            gameId={selectedGame.id}
            setSelectedGameMoves={setMovesGame}
            className="mt-4"
          />
          <MovesList moves={movesGame} />
        </div>
      )}
    </div>
  );
};

export default GamesList;
