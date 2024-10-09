const Game = require('../models/game.js');
const { playerExist } = require('./playerController.js');

// Crear una nueva partida
const createMatch = async (req, res) => {
  const { playerWhiteId, playerBlackId } = req.body;
  try {
    const playerWhite = await playerExist(playerWhiteId);
    const playerBlack = await playerExist(playerBlackId);
    if (!playerWhite || !playerBlack) {
      return res.status(404).json({
        message: 'No se ha encontrado un jugador',
        error
      })
    }
    const response = await Game.create({whitePlayerId: playerWhiteId, blackPlayerId: playerBlackId })
    console.log('RESPONSE', response)
    return res.status(201).json({
      message: 'Partida creada con exito',
      game: response,
    });
  } catch(error) {
    return res.status(500).json({
      message: 'Error al crear una partida',
      error
    })
  }
};

// Obtener todas las partidas
const getAllMatches = async (req, res) => {
};

// Actualizar una partida
const updateResult = async (req, res) => {
  const { result } = req.body;
  const gameId = req.params.id;
  
  try {
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({
        message: 'Partida no encontrada',
      });
    }
    game.result = result;
    await game.save();
    return res.status(200).json({
      message: 'El juego se actualizo con exito',
      game
    })
  } catch(error) {
    return res.status(500).json({
      message: 'Error al actualizar una partida',
      error
    })
  }
};

// Eliminar una partida
const deleteMatch = async (req, res) => {
};

// Obtener una partida por su id
const getMatchById = async (req, res) => {
};

module.exports = {
  createMatch,
  getAllMatches,
  updateResult,
  deleteMatch,
  getMatchById
};