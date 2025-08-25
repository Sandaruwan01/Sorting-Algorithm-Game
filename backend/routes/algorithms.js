const express = require('express');
const router = express.Router();
const { getAlgorithms, getAlgorithmBySlug } = require('../controllers/algorithmController');

router.get('/', getAlgorithms);
router.get('/:slug', getAlgorithmBySlug);

module.exports = router;
