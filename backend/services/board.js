const Game = require('../models/game.js');

const isValidPosition = (position) => {
  return (
    position.x >= 0 && position.x <= 7 &&
    position.y >= 0 && position.y <= 7
  );
};

const updateBoard = async (gameId, from, to, piece) => {
  try {
    const game = await Game.findByPk(gameId);
    if (!game) {
      throw new Error('Juego no encontrado');
    }
    
    let board = JSON.parse(game.board);
    const movingPiece = board[from.y][from.x]; // VER ESTO SI ES CORRECTO

    // Verificar que las posiciones sean válidas
    if (!isValidPosition(from) || !isValidPosition(to)) {
      throw new Error('Posición de ajedrez no válida (debe estar entre a1 y h8)');
    }
    board[to.y][to.x] = movingPiece; 
    board[from.y][from.x] = " ";

    const updatedBoardString = JSON.stringify(board);
    game.board = updatedBoardString;
    await game.save();
    
    return game;
  } catch (error) {
    console.error('Error al actualizar el tablero:', error);
    throw error; 
  }
};
module.exports = {
  updateBoard
};