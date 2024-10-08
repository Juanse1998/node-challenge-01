const Game  = require('./game.js');
const Move  = require('./move.js');
const Player = require('./player.js');

Game.hasMany(Move, {
  foreignKey: 'gameId',
  as: 'moves'
});

Move.belongsTo(Game, {
  foreignKey: 'gameId',
  as: 'games'
});

Game.belongsTo(Player, {
  foreignKey: 'whitePlayerId',
  as: 'whitePlayer'
});

Game.belongsTo(Player, {
  foreignKey: 'blackPlayerId',
  as: 'blackPlayer'
});

Player.hasMany(Game, {
  foreignKey: 'whitePlayerId',
  as: 'gamesAsWhite'
});

Player.hasMany(Game, {
  foreignKey: 'blackPlayerId',
  as: 'gamesAsBlack'
});

Move.belongTo(Player, {
  foreignKey: 'playerId',
  as: 'players'
});

Player.belongTo(Move, {
  foreignKey: 'playerId',
  as: 'moves'
});