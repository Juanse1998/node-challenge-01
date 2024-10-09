const Player = require('../models/player.js');

const createPlayer = async (req, res) => {
  const { name, last_name, username, password } = req.body;

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
    return res.status(500).json({ message: 'Error creating player', error: error.message });
  }


}

module.exports = {
  createPlayer
};