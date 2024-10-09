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

module.exports = {
  createPlayer
};