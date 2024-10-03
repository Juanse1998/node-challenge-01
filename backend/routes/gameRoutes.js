import express from 'express';
import { createGame, getAllGames } from '../controllers/gameController.js';

const router = express.Router();

router.post('/games', createGame);
router.get('/games', getAllGames);

export default router;
