const Move = require('../models/move.js');
const Game = require('../models/game.js');
const { isValidPosition } = require('../services/move.js')
const { updateBoard } = require('../services/board.js')


const createMove = async (req, res) => {
  const { piece, to, from, gameId } = req.body;

  // Verificar que piece y sus propiedades están definidos
  if (!piece || !piece.name || !to || !from || !gameId) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  // Verificar que las coordenadas estén dentro de los límites
  if (!isValidPosition(from) || !isValidPosition(to)) {
    return res.status(400).json({ message: 'Coordenadas fuera de límites' });
  }

  try {
    // Actualizar el tablero utilizando la función updateBoard
    const updatedGame = await updateBoard(gameId, from, to, piece.name);

    if (!updatedGame) {
      return res.status(400).json({ message: 'Movimiento inválido' });
    }

    // Crear el objeto de movimiento en la estructura adecuada
    const moveData = {
      from: { x: from.x, y: from.y },
      to: { x: to.x, y: to.y },
      piece: piece.name 
    };

    // Registrar el movimiento en la tabla de movimientos
    const move = await Move.create({
      gameId: updatedGame.id,
      fromX: from.x,
      fromY: from.y,
      toX: to.x,
      toY: to.y,
      piece: moveData.piece // Guarda el movimiento en la misma estructura
    });

    return res.status(200).json({
      message: 'Movimiento realizado con éxito',
      board: JSON.parse(updatedGame.board),  // Tablero actualizado
      moveId: move.id,  // ID del movimiento registrado
      move: moveData // Incluye los datos del movimiento en la respuesta
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al realizar el movimiento',
      error: error.message
    });
  }
};

const getAllMoves = (req, res) => {

}

module.exports = {
  createMove,
  getAllMoves
};