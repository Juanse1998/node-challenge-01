const express = require('express');
const { getAllMoves, createMove } = require('../controllers/moveController');

const router = express.Router();

router.get('/:id/moves', getAllMoves);
router.post('/:id/moves', createMove);

module.exports = router;
