const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const Game = require('./models/game.js');
const Move = require('./models/move.js');
const Player = require('./models/player.js');
const playerRoutes = require('./routes/playerRoutes.js');
const moveRoutes = require('./routes/moveRoutes.js');
const gameRoutes = require('./routes/gameRoutes.js');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use('/api/players', playerRoutes);
app.use('/api/moves', moveRoutes);
app.use('/api/games', gameRoutes);


const sequelize = new Sequelize('mydatabase', 'admin', 'password', {
  host: 'postgres',
  port: 5432,
  dialect: 'postgres',
});




sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Aca creamos las tablas
const syncDatabase = async () => {
  try {
    await Player.sync({ force: false });
    await Game.sync({ force: false });
    await Move.sync({ force: false });
    
    // Usa findOrCreate para evitar la duplicación de jugadores
    const [player1, player1Created] = await Player.findOrCreate({
      where: { username: 'player1' },
      defaults: {
        name: 'Player 1',
        last_name: 'Sosa',
        password: '123456'
      }
    });
    
    const [player2, player2Created] = await Player.findOrCreate({
      where: { username: 'player2' },
      defaults: {
        name: 'Player 2',
        last_name: 'Sosa',
        password: '123456'
      }
    });
    
    // Verifica si ya existe una partida con estos jugadores
    const gameExists = await Game.findOne({
      where: {
        whitePlayerId: player1.id,
        blackPlayerId: player2.id
      }
    });
    
    const loadMoves = (gameId) => {
      const moves = [
        { from: 'e2', to: 'e4', piece: 'pawn', gameId: gameId, playerId: player1.id},
        { from: 'e5', to: 'e7', piece: 'pawn', gameId: gameId, playerId: player1.id },
        { from: 'g1', to: 'f3', piece: 'knight', gameId: gameId, playerId: player2.id},
        { from: 'b8', to: 'c6', piece: 'knight', gameId: gameId, playerId: player2.id}
      ];
      return moves;
    }
    // Crea el juego solo si no existe
    if (!gameExists) {
      var game = await Game.create({
        whitePlayerId: player1.id,
        blackPlayerId: player2.id,
      });
    }
    const moves = gameExists ? loadMoves(gameExists.id) : loadMoves(game.id);


    await Move.bulkCreate(moves);
    console.log('Base de datos sincronizada con éxito.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto 3000');
  });
});

