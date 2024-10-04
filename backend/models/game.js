const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Move = require('./move.js');

class Game extends Model {}

Game.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  whitePlayerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: Player,
    //   key: 'id',
    // }
  },
  blackPlayerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: Player,
    //   key: 'id',
    // }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  state: {
    type: DataTypes.ENUM('ongoing', 'finished', 'abandoned'),
    allowNull: false,
    defaultValue: 'ongoing',
  },
  result: {
    type: DataTypes.ENUM('white wins', 'black wins', 'tables'),
    allowNull: true,
  },

}, {
  sequelize,
  modelName: 'Game',
  tableName: 'games',
  timestamps: true,
});

Game.hasMany(Move, {
  foreignKey: 'gameId',
  as: 'moves'
});

module.exports = Game;
