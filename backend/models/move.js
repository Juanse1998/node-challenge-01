const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que esta ruta sea correcta
const Game = require('./game.js');

class Move extends Model {}

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
      model: Game,  // Asegúrate de que este modelo esté definido antes de usarlo
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  sequelize, // Aquí pasas la instancia de sequelize
  modelName: 'Move',
});



module.exports = Move;
