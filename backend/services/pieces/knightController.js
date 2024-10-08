const knightMoves = [
  [2, 1], [2, -1], [-2, 1], [-2, -1], // movimientos horizontales largos
  [1, 2], [1, -2], [-1, 2], [-1, -2]  // movimientos verticales largos
];

// Función para verificar si una posición está dentro del tablero
const isValidPosition = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

// Función para calcular los movimientos posibles del caballo
const getKnightMoves = (x, y, board) => {
  const validMoves = [];

  knightMoves.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;

    if (isValidPosition(newX, newY)) {
      const targetPiece = board[newX][newY];

      // Verifica que la pieza actual tenga un color antes de comparar
      const currentPiece = board[x][y];
      if (!targetPiece || currentPiece) {
        validMoves.push([newX, newY]);
      }
    }
  });

  return validMoves;
};

module.exports = {
  getKnightMoves
};
