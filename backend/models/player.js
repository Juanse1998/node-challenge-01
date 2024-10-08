const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Move = require('./move.js');

class Player extends Model {}

Player.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  last_name: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  username: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Aca podria agregar un metodo para encriptar la password
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Player',
  tableName: 'players',
  timestamps: true,
});

module.exports = Player;
