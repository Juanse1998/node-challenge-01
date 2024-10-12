const Game = require('../models/game.js');
const { playerExist } = require('./playerController.js');

// Crear una nueva partida
const createMatch = async (req, res) => {
  const board = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ]
  const boardString = JSON.stringify(board);
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
    const response = await Game.create({whitePlayerId: playerWhiteId, blackPlayerId: playerBlackId, board: boardString })
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
  try {
    const games = await Game.findAll();
    return res.status(200).json({games});
  } catch(error) {
    return res.status(500).json({
      message: 'Error al buscar las partidas',
      error
    })
  }
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
  const gameId = req.params.id;
  try {
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({
        message: 'Partida no encontrada',
      });
    }
    Game.destroy({
      where: {
        id: game.id
      }
    })
    return res.status(200).json({
      message: 'El juego se elimino con exito',
      game
    })
  } catch(error) {
    return res.status(500).json({
      message: 'Error al eliminar una partida',
      error
    })
  }
};

// Obtener una partida por su id
const getMatchById = async (req, res) => {
  const gameId = req.params.id;
  try {
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({
        message: 'Partida no encontrada',
      });
    }
    return res.status(200).json({
      message: 'El juego se encontro con exito',
      game
    })
  } catch(error) {
    return res.status(500).json({
      message: 'Error al buscar una partida',
      error
    })
  }
};

module.exports = {
  createMatch,
  getAllMatches,
  updateResult,
  deleteMatch,
  getMatchById
};