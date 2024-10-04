import express from 'express';
import { createMatch, getMatchById, getAllMatches, updateMatch, deleteMatch } from '../controllers/gameController.js';

const router = express.Router();

router.post('/matches', createMatch);
router.get('/matches', getAllMatches);
router.get('/matches/:id', getMatchById);
router.put('/matches/:id', updateMatch);
router.delete('/matches/:id', deleteMatch);

export default router;
