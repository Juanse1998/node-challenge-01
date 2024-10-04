const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Game = require('./game.js');

class Move extends Model {};

Move.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false
  },
  piece: {
    type: DataTypes.ENUM('torre', 'alfil', 'rey', 'caballo', 'peon', 'reina'),
    allowNull: false,
  },
  gameId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'games',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
})

Move.belongsTo(Game, {
  foreignKey: 'gameId',
  as: 'game'
});

module.exports = Move;