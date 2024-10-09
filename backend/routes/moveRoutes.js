const express = require('express');
const { getAllMoves, createMove } = require('../controllers/moveController');

const router = express.Router();

router.get('/:gameId/moves', getAllMoves);
router.post('/:gameId/moves', createMove);

module.exports = router;
