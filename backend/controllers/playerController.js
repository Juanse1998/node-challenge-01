const Player = require('../models/player.js');

const createPlayer = async (req, res) => {
  const { name, last_name, username, password } = req.body; 
  if (typeof name !== 'string' || typeof last_name !== 'string' || typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({
      message: 'Los campos name, last_name, username, y password deben ser strings',
    });
  }
  try {
    const [player, created] = await Player.findOrCreate({
      where: { username: username },
      defaults: {
        name: name,
        last_name: last_name,
        password: password
      }
    });
    if (created) {
      return res.status(201).json({
        message: 'Jugador creado con exito',
        player
      })
    } else {
      return res.status(200).json({
        message: 'El jugador ya existe',
        player
      })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el jugador', error: error.message });
  }
}

const playerExist = async (id) => {
  console.log('ID', id);
  const player = await Player.findByPk(id);
  return player ? true : false;
} 

const getAllPlayers = async (_, res) => {
  try {
    // Buscar movimientos que pertenecen a un juego específico
    const players = await Player.findAll();

    // Si no se encuentran movimientos, devolver un mensaje adecuado
    if (players.length === 0) {
      return res.status(404).json({ message: 'No se encontraron movimientos para esta partida.' });
    }

    return res.status(200).json({ players }); // Devolver los movimientos encontrados
  } catch (error) {
    console.error('Error al obtener los movimientos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  createPlayer,
  playerExist,
  getAllPlayers
};