const Move = require('../models/move.js');
const { getKnightMoves } = require('../controllers/pieces/knightController.js')

const createMove = async (req, res) => {
  const { piece, to, from, board } = req.body;

  // Verificar que piece y sus propiedades están definidos
  if (!piece || !piece.name || !to || !from || !board) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  switch (piece.name) {
    case 'knight':
      let validMoves = getKnightMoves(from.x, from.y, board);
      const isValidMove = validMoves.some(move => move[0] === to.x && move[1] === to.y);
      
      if (isValidMove) {
        // Mover la pieza
        board[to.x][to.y] = piece;
        board[from.x][from.y] = null;

        return res.status(200).json({
          message: 'Movimiento realizado con éxito',
          board,
        });
      } else {
        return res.status(400).json({
          message: 'Movimiento invalido para el caballo',
        });
      }
    default:
      return res.status(400).json({ message: 'Tipo de pieza no soportado' });
  }
};


// Obtener todas los movimientos
const getAllMoves = async (req, res) => {
};


module.exports = {
  createMove,
  getAllMoves
};