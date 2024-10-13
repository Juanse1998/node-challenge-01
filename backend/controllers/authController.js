const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Player = require('../models/player.js')

const router = express.Router();
const JWT_SECRET = 'el_toke_de_tu_vida';

// Ruta para iniciar sesión
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el jugador por nombre de usuario
    const player = await Player.findOne({ where: { username } });

    if (!player) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(password, player.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Crear un token JWT
    const token = jwt.sign({ id: player.id }, JWT_SECRET, { expiresIn: '5h' });
    
    // Enviar el token al cliente
    res.json({ token });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  login
};
