const express = require('express');
const { createPlayer } = require('../controllers/playerController.js');

const router = express.Router();

router.post('/create-player', createPlayer);

// A futuro agregar esto si llego con tiempo
// router.post('/login', login);
module.exports = router;