const { updateBoard } = require('./board.js');
const Move = require('../models/move.js');

const registerMoves = async (gameId, moves) => {
  for (const move of moves) {
    try {
      const piece = { name: move.piece };
      const response = await handleCreateMove(piece.name, move.to, move.from, gameId);
      if (response.status !== 200) {
        console.error(`Error al registrar el movimiento desde ${move.from.x}, ${move.from.y} a ${move.to.x}, ${move.to.y}: ${response.message}`);
        break;
      }
    } catch (error) {
      console.error(`Error en el movimiento desde ${move.from.x}, ${move.from.y} a ${move.to.x}, ${move.to.y}: ${error.message}`);
      break;
    }
  }
};

const handleCreateMove = async (piece, to, from, gameId) => {
  try {
    // Simular la creación de movimiento como en createMove
    const updatedGame = await updateBoard(piece, to, from, gameId );
    if (!updatedGame) {
      throw new Error('Movimiento inválido');
    }

    // Crear el objeto de movimiento en la estructura adecuada
    const moveData = {
      from: { x: from.x, y: from.y },
      to: { x: to.x, y: to.y },
      piece: piece // Mantener el nombre de la pieza tal como se proporciona
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

    return {
      message: 'Movimiento realizado con éxito',
      board: JSON.parse(updatedGame.board),  // Tablero actualizado
      moveId: move.id,  // ID del movimiento registrado
      move: moveData, // Incluye los datos del movimiento en la respuesta
      status: 200,
    };
  } catch (error) {
    throw new Error('Error al realizar el movimiento: ' + error.message);
  }
};


module.exports = {
  registerMoves,
  handleCreateMove
};