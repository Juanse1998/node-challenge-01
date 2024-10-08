const express = require('express');
const { Sequelize } = require('sequelize');
const Game = require('./models/game.js');
const Move = require('./models/move.js');
const Player = require('./models/player.js');

const PORT = 3000;

const app = express();
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
    await Game.sync({ force: false }); // Usa force: false para recrear la tabla si existe
    await Move.sync({ force: false });
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
