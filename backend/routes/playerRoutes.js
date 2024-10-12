const express = require('express');
const { createPlayer, getAllPlayers } = require('../controllers/playerController.js');

const router = express.Router();

router.post('/create-player', createPlayer);
router.get('/get-players', getAllPlayers);

// A futuro agregar esto si llego con tiempo
// router.post('/login', login);
module.exports = router;