const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database.js');

const Game = require('./models/game.js');
const Move = require('./models/move.js');
const Player = require('./models/player.js');
const playerRoutes = require('./routes/playerRoutes.js');
const moveRoutes = require('./routes/moveRoutes.js');
const gameRoutes = require('./routes/gameRoutes.js');

const { registerMoves } = require('./services/move.js');
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use('/api/players', playerRoutes);
app.use('/api/match', moveRoutes);
app.use('/api/matches', gameRoutes);

require("dotenv").config();

// Sincroniza la base de datos y luego inicia el servidor
const syncDatabaseAndStartServer = async () => {
  const initialBoard = JSON.stringify([
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ]);
  
  try {
    // Autenticación de la base de datos
    await sequelize.authenticate();
    // Sincroniza las tablas
    await Player.sync({ force: true });
    await Game.sync({ force: true });
    await Move.sync({ force: true });

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
        blackPlayerId: player2.id
      },
    });


    let game;
  
    const completedGameMoves1 = [
      { from: { x: 4, y: 6 }, to: { x: 4, y: 4 }, piece: 'P' }, // Peón blanco mueve de e2 a e4
      { from: { x: 4, y: 1 }, to: { x: 4, y: 3 }, piece: 'p' }, // Peón negro mueve de e7 a e5
      { from: { x: 6, y: 7 }, to: { x: 5, y: 5 }, piece: 'N' }, // Caballo blanco mueve de g1 a f3
      { from: { x: 1, y: 0 }, to: { x: 2, y: 2 }, piece: 'n' }, // Caballo negro mueve de b8 a c6
      { from: { x: 3, y: 7 }, to: { x: 7, y: 3 }, piece: 'Q' }, // Dama blanca mueve de d1 a h5
      { from: { x: 6, y: 0 }, to: { x: 5, y: 2 }, piece: 'n' }, // Caballo negro mueve de g8 a f6
      { from: { x: 5, y: 7 }, to: { x: 2, y: 4 }, piece: 'B' }, // Alfil blanco mueve de f1 a c4
      { from: { x: 3, y: 1 }, to: { x: 3, y: 2 }, piece: 'p' }, // Peón negro mueve de d7 a d6
      { from: { x: 7, y: 3 }, to: { x: 5, y: 1 }, piece: 'Q' }  // Dama blanca jaque mate en f7
    ];

    const completedGameMoves2 = [
      { from: { x: 4, y: 6 }, to: { x: 4, y: 4 }, piece: 'P' }, // Peón blanco mueve de e2 a e4
      { from: { x: 4, y: 1 }, to: { x: 4, y: 3 }, piece: 'p' }, // Peón negro mueve de e7 a e5
      { from: { x: 6, y: 7 }, to: { x: 5, y: 5 }, piece: 'N' }, // Caballo blanco mueve de g1 a f3
      { from: { x: 1, y: 0 }, to: { x: 2, y: 2 }, piece: 'n' }, // Caballo negro mueve de b8 a c6
      { from: { x: 5, y: 7 }, to: { x: 2, y: 4 }, piece: 'B' }, // Alfil blanco mueve de f1 a c4
      { from: { x: 6, y: 1 }, to: { x: 6, y: 2 }, piece: 'p' }, // Peón negro mueve de g7 a g6
      { from: { x: 3, y: 7 }, to: { x: 7, y: 3 }, piece: 'Q' }, // Reina blanca mueve de d1 a h5
      { from: { x: 5, y: 1 }, to: { x: 5, y: 0 }, piece: 'p' }, // Peón negro mueve de f7 a f6
      { from: { x: 5, y: 5 }, to: { x: 4, y: 5 }, piece: 'N' }, // Caballo blanco mueve de f3 a e5
      { from: { x: 7, y: 3 }, to: { x: 5, y: 5 }, piece: 'Q' }, // Reina blanca mueve de h5 a f7 (jaque mate)
    ];
    
    
    const gameTwo = await Game.create({
      whitePlayerId: player1.id,
      blackPlayerId: player2.id,
      board: initialBoard
    });
    const gameThree = await Game.create({
      whitePlayerId: player1.id,
      blackPlayerId: player2.id,
      board: initialBoard
    });

    if (!gameExists) {
      game = await Game.create({
        whitePlayerId: player1.id,
        blackPlayerId: player2.id,
        board: initialBoard
      });
    } else {
      game = gameExists;
    }
    registerMoves(game.id, completedGameMoves1);
    registerMoves(gameTwo.id, completedGameMoves2)

    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
    
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

// Llama a la función para sincronizar la base de datos y luego iniciar el servidor
syncDatabaseAndStartServer();



