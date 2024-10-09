const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database.js');

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
app.use('/api/matches', gameRoutes);

require("dotenv").config();

// Sincroniza la base de datos y luego inicia el servidor
const syncDatabaseAndStartServer = async () => {
  try {
    
    // Autenticación de la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');

    // Sincroniza las tablas
    await Player.sync({ force: true });
    await Game.sync({ force: true });
    await Move.sync({ force: true });

    console.log('Base de datos sincronizada con éxito.');

    // Usa findOrCreate para evitar la duplicación de jugadores
    const [player1, player1Created] = await Player.findOrCreate({
      where: { username: 'player1' },
      defaults: {
        name: 'Player 1',
        last_name: 'Sosa',
        password: '123456',
      },
    });

    const [player2, player2Created] = await Player.findOrCreate({
      where: { username: 'player2' },
      defaults: {
        name: 'Player 2',
        last_name: 'Sosa',
        password: '123456',
      },
    });

    // Verifica si ya existe una partida con estos jugadores
    const gameExists = await Game.findOne({
      where: {
        whitePlayerId: player1.id,
        blackPlayerId: player2.id,
      },
    });

    const loadMoves = (gameId) => {
      const moves = [
        { from: 'e2', to: 'e4', piece: 'pawn', gameId: gameId, playerId: player1.id },
        { from: 'e5', to: 'e7', piece: 'pawn', gameId: gameId, playerId: player1.id },
        { from: 'g1', to: 'f3', piece: 'knight', gameId: gameId, playerId: player2.id },
        { from: 'b8', to: 'c6', piece: 'knight', gameId: gameId, playerId: player2.id },
      ];
      return moves;
    };

    // Crea el juego solo si no existe
    let game;
    if (!gameExists) {
      game = await Game.create({
        whitePlayerId: player1.id,
        blackPlayerId: player2.id,
      });
    } else {
      game = gameExists;
    }
    
    const moves = loadMoves(game.id);
    await Move.bulkCreate(moves);

    // Inicia el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
    
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

// Llama a la función para sincronizar la base de datos y luego iniciar el servidor
syncDatabaseAndStartServer();
