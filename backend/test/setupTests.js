require("dotenv").config();
const environment = process.env.NODE_ENV || 'development';
const { Sequelize } = require('sequelize');

const config = require('../config/config.js')[environment];

const Player = require('../models/player.js');
const Move = require('../models/move.js');
const Game = require('../models/game.js');


const sequelize = new Sequelize(process.env.TEST_POSTGRES_DB, process.env.TEST_POSTGRES_USER, process.env.TEST_POSTGRES_PASSWORD, {
  host: process.env.TEST_POSTGRES_HOST,
  dialect: 'postgres',
});

beforeAll(async () => {
  try {
    console.log('SEQUELIZE', sequelize);
    await Player.sync({ force: true });
    await Move.sync({ force: true });
    await Game.sync({ force: true });

  } catch (error) {
    console.error('Error durante la sincronización de las tablas:', error);
  }
});



afterAll(async () => {
  await sequelize.close(); // Cierra la conexión después de las pruebas
});
