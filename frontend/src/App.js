import React, { useState, useEffect } from 'react';
import './App.css'; // Asegúrate de importar el archivo CSS
import GamesList from './components/GamesList.jsx';
import MovesList from './components/MovesList.jsx';
import Board from './components/Board.jsx';

const App = () => {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedGameMoves, setSelectedGameMoves] = useState([]);
  const [board, setBoard] = useState([]);
  const [players, setPlayers] = useState([]);
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
    getPlayers();
    fetchGames();
  }, []);

  const getPlayers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/players/get-players');
      const data = await response.json();
      setPlayers(data.players);
    } catch (error) {
      console.log('error', error);
    }
  };

  const updateBoard = (newBoard) => {
    setBoard(newBoard);
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
        gameId: selectedGameId,
      };

      const response = await sendMove(moveData);
      if (response) {
        const updatedBoard = board.map((row) => [...row]);
        updatedBoard[fromPosition.y][fromPosition.x] = ' ';
        updatedBoard[to.y][to.x] = selectedPiece;

        updateBoard(updatedBoard);
        addMoveToList({
          piece: selectedPiece,
          fromX: fromPosition.x,
          fromY: fromPosition.y,
          toX: colIndex,
          toY: rowIndex,
        });
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

  const handleCreateGame = async () => {
    const data = {
      playerWhiteId: players[0].id,
      playerBlackId: players[1].id,
    };
    try {
      const response = await fetch(`http://localhost:3000/api/matches/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const newGame = await response.json();
        setGames((prevGames) => [...prevGames, newGame.game]);
      }
    } catch (error) {
      console.log('Error fetching moves:', error);
    }
  };

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
      return null;
    }
  };

  return (
    <div className="App">
      <h1>Partidas de Ajedrez</h1>
      <div className="button-container">
        <button onClick={handleCreateGame}>Crear Partida</button>
      </div>
      <div className="games-list">
        <GamesList games={games} setGames={setGames} />
      </div>
      {selectedGameId && (
        <>
          <Board
            board={board}
            onCellClick={handleCellClick}
            gameId={selectedGameId}
            updateBoard={updateBoard}
            addMoveToList={addMoveToList}
            setSelectedGameMoves={setSelectedGameMoves}
          />
          <div className="moves-list">
            <MovesList moves={selectedGameMoves} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
