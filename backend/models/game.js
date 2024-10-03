const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Game extends Model {}

Game.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = Game;
