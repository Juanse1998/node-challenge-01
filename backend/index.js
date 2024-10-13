const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database.js');
const bcrypt = require('bcryptjs');
const app = express();
const cors = require('cors');
const Game = require('./models/game.js');
const Move = require('./models/move.js');
const Player = require('./models/player.js');
const playerRoutes = require('./routes/playerRoutes.js');
const moveRoutes = require('./routes/moveRoutes.js');
const gameRoutes = require('./routes/gameRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const { registerMoves } = require('./services/move.js');

const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/players', playerRoutes);
app.use('/api/match', moveRoutes);
app.use('/api/matches', gameRoutes);
app.use('/api', authRoutes);

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
    const hashedPassword = await bcrypt.hash('123456', 10);
    const [player1, player1Created] = await Player.findOrCreate({
      where: { username: 'player1' },
      defaults: {
        name: 'Player 1',
        last_name: 'Sosa',
        password: hashedPassword,
      },
    });

    const hashedPasswordTwo = await bcrypt.hash('123456', 10);
    const [player2, player2Created] = await Player.findOrCreate({
      where: { username: 'player2' },
      defaults: {
        name: 'Player 2',
        last_name: 'Sosa',
        password: hashedPasswordTwo,
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
      { from: { x: 5, y: 6 }, to: { x: 5, y: 5 }, piece: 'P' }, // Peón blanco mueve de f2 a f3
      { from: { x: 4, y: 1 }, to: { x: 4, y: 2 }, piece: 'p' }, // Peón negro mueve de e7 a e6
      { from: { x: 6, y: 6 }, to: { x: 6, y: 4 }, piece: 'n' }, // Caballo negro mueve de g2 a g4
      { from: { x: 3, y: 0 }, to: { x: 7, y: 4 }, piece: 'N' }, // Caballo blanco mueve de d8 a h4

    ];

    const completedGameMovesBlackWin = [
      { from: { x: 4, y: 6 }, to: { x: 4, y: 4 }, piece: 'P' }, // Peón blanco mueve de e2 a e4
      { from: { x: 4, y: 1 }, to: { x: 4, y: 3 }, piece: 'p' }, // Peón negro mueve de e7 a e5
      { from: { x: 6, y: 7 }, to: { x: 5, y: 5 }, piece: 'N' }, // Caballo blanco mueve de g1 a f3
      { from: { x: 1, y: 0 }, to: { x: 2, y: 2 }, piece: 'n' }, // Caballo negro mueve de b8 a c6
      { from: { x: 3, y: 7 }, to: { x: 7, y: 3 }, piece: 'Q' }, // Dama blanca mueve de d1 a h5
      { from: { x: 6, y: 0 }, to: { x: 5, y: 2 }, piece: 'n' }, // Caballo negro mueve de g8 a f6
      { from: { x: 5, y: 7 }, to: { x: 2, y: 4 }, piece: 'B' }, // Alfil blanco mueve de f1 a c4
      { from: { x: 3, y: 1 }, to: { x: 3, y: 3 }, piece: 'p' }, // Peón negro mueve de d7 a d5
      { from: { x: 7, y: 3 }, to: { x: 6, y: 6 }, piece: 'Q' }, // Dama blanca se retira a g6
      { from: { x: 5, y: 2 }, to: { x: 4, y: 4 }, piece: 'n' }, // Caballo negro da jaque en e4
      { from: { x: 6, y: 6 }, to: { x: 6, y: 7 }, piece: 'Q' }, // Dama blanca se mueve a g7 para defender
      { from: { x: 2, y: 2 }, to: { x: 3, y: 4 }, piece: 'n' }, // Caballo negro da jaque mate en e3
    ];
    
    const gameOne = await Game.create({
      whitePlayerId: player1.id,
      blackPlayerId: player2.id,
      board: initialBoard,
      result: 'white wins'
    });

    const gameTwo= await Game.create({
      whitePlayerId: player1.id,
      blackPlayerId: player2.id,
      board: initialBoard,
      result: 'black wins'
    });
    const gameThree= await Game.create({
      whitePlayerId: player1.id,
      blackPlayerId: player2.id,
      board: initialBoard,
      result: 'black wins'
    });

    registerMoves(gameOne.id, completedGameMoves1);
    registerMoves(gameTwo.id, completedGameMoves2);
    registerMoves(gameThree.id, completedGameMovesBlackWin)
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
    
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

// Llama a la función para sincronizar la base de datos y luego iniciar el servidor
syncDatabaseAndStartServer();



