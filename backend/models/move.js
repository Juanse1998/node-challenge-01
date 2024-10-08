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
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'players',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isValidPosition(value) {
        if (!/^[a-h][1-8]$/.test(value)) {
          throw new Error('Posición de ajedrez no válida (debe estar entre a1 y h8)');
        }
      }
    }
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isValidPosition(value) {
        if (!/^[a-h][1-8]$/.test(value)) {
          throw new Error('Posición de ajedrez no válida (debe estar entre a1 y h8)');
        }
      }
    }
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
