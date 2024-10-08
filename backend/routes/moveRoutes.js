const { express } = require('express');
const { getAllMoves, createMove } = require('../controllers/moveController');

const router = express.Router();

router.get('games/:gameId/moves', getAllMoves);
router.post('games/:gameId/moves', createMove);