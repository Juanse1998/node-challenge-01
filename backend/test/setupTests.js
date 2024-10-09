const sequelize  = require('../config/database.js');
const { Sequelize } = require('sequelize');
require("dotenv").config();
const environment = process.env.NODE_ENV || 'development';

const config = require('../config/config.js')[environment];

const Player = require('../models/player.js');
const Move = require('../models/move.js');
const Game = require('../models/game.js');


beforeAll(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Error durante la sincronización de las tablas:', error);
  }
});



afterAll(async () => {
  await sequelize.close(); // Cierra la conexión después de las pruebas
});
