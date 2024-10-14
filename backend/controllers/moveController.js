const Move = require('../models/move.js');
const Game = require('../models/game.js');
const { isValidPosition } = require('../services/move.js')
const { updateBoard } = require('../services/board.js')


const createMove = async (req, res) => {
  const { piece, to, from, gameId } = req.body;
  // Verificar que piece y sus propiedades están definidos
  if (!piece || !to || !from || !gameId) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  try {
    const updatedGame = await updateBoard(gameId, from, to, piece.name);
    if (!updatedGame) {
      return res.status(400).json({ message: 'Movimiento inválido' });
    }
    const moveData = {
      from: { x: from.x, y: from.y },
      to: { x: to.x, y: to.y },
      piece: piece 
    };
    const move = await Move.create({
      gameId: updatedGame.id,
      fromX: from.x,
      fromY: from.y,
      toX: to.x,
      toY: to.y,
      piece: moveData.piece
    });

    return res.status(200).json({
      message: 'Movimiento realizado con éxito',
      board: JSON.parse(updatedGame.board),
      moveId: move.id,
      move: moveData
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al realizar el movimiento',
      error: error.message
    });
  }
};

const getAllMoves = async (req, res) => {
  const gameId = req.params.id;

  try {
    // Buscar movimientos que pertenecen a un juego específico
    const moves = await Move.findAll({
      where: {
        gameId: gameId // Filtrar por gameId
      }
    });

    // Si no se encuentran movimientos, devolver un mensaje adecuado
    if (moves.length === 0) {
      return res.status(404).json({ message: 'No se encontraron movimientos para esta partida.' });
    }

    return res.status(200).json({ moves }); // Devolver los movimientos encontrados
  } catch (error) {
    console.error('Error al obtener los movimientos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};



module.exports = {
  createMove,
  getAllMoves
};