const Game = require('../models/game.js');

const isValidPosition = (position) => {
  return (
    position.x >= 0 && position.x <= 7 &&
    position.y >= 0 && position.y <= 7
  );
};

const updateBoard = async (piece, to, from, gameId) => {
  try {
    const game = await Game.findByPk(gameId);
    if (!game) {
      throw new Error('Juego no encontrado');
    }
    // Convertir el tablero de la base de datos a un array bidimensional
    let board = JSON.parse(game.board);
    const movingPiece = board[from.y][from.x]; // Cambiar de from.x a from.y y viceversa
    if (!isValidPosition(from) || !isValidPosition(to)) {
      throw new Error('Posición de ajedrez no válida (debe estar entre a1 y h8)');
    }

    // Verificar que no se esté moviendo a una posición ocupada por una pieza del mismo color
    if (board[to.y][to.x] !== " " && (board[to.x][to.y].toLowerCase() === piece.toLowerCase())) {
      throw new Error('No se puede mover a una posición ocupada por la propia pieza');
    }
    board[to.y][to.x] = movingPiece;
    board[from.y][from.x] = " ";
    const updatedBoardString = JSON.stringify(board);
    game.board = updatedBoardString;
    await game.save();
    return game;
  } catch (error) {
    console.error('Error al actualizar el tablero:', error);
    throw error; // Rethrow the error for further handling
  }
};

module.exports = {
  updateBoard
};