const Game  = require('./game.js');
const Move  = require('./move.js');

Game.hasMany(Move, {
  foreignKey: 'gameId',
  as: 'moves'
});

Move.belongsTo(Game, {
  foreignKey: 'gameId',
  as: 'game'
});