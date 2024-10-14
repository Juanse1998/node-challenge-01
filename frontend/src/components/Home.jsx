import React, { useState, useEffect } from 'react';
import GamesList from './GamesList.jsx';
import MovesList from './MovesList.jsx';
import Board from './Board.jsx';

const Home = ({handleLogout}) => {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  
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

  return (
    <div className="App">
      <h1>Partidas de Ajedrez</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
        <div className="button-container">
          <button onClick={handleCreateGame}>Crear Partida</button>
        </div>
        <div className="games-list">
          <GamesList games={games} setGames={setGames} />
        </div>
    </div>
  );
};

export default Home;
