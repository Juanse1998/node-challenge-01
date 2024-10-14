const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Player = require('../models/player.js')

const JWT_SECRET = 'el_token_de_tu_vida';

let revokedTokens = [];

// Ruta para iniciar sesión
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const player = await Player.findOne({ where: { username } });

    if (!player) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, player.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Crear un token JWT
    const token = jwt.sign({ id: player.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const logout = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  revokedTokens.push(token);
  res.json({ message: 'Sesión cerrada exitosamente' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado' });
  }
  if (revokedTokens.includes(token)) {
    return res.status(401).json({ message: 'Token inválido, por favor inicia sesión nuevamente' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = {
  login,
  logout,
  verifyToken
};
