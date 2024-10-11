const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Game = require('./game.js');  // Asegúrate de que la referencia a Game esté bien definida

class Move extends Model {}

Move.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fromX: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fromY: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  toX: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  toY: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  piece: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'games',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  modelName: 'Move',
  tableName: 'moves',
  timestamps: true 
});

module.exports = Move;
