const express = require('express');
const { createMatch, getMatchById, getAllMatches, updateResult, deleteMatch } =  require('../controllers/gameController.js');

const router = express.Router();

router.post('/', createMatch);
router.get('/', getAllMatches);
router.get('/:id', getMatchById);
router.put('/:id', updateResult);
router.delete('/:id', deleteMatch);

module.exports = router;