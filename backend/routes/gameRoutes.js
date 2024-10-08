const express = require('express');
const { createMatch, getMatchById, getAllMatches, updateMatch, deleteMatch } =  require('../controllers/gameController.js');

const router = express.Router();

router.post('/matches', createMatch);
router.get('/matches', getAllMatches);
router.get('/matches/:id', getMatchById);
router.put('/matches/:id', updateMatch);
router.delete('/matches/:id', deleteMatch);

module.exports = router;
