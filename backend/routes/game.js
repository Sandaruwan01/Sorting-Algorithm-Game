const express = require('express');
const router = express.Router();
const { getQuestions, submitScore } = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');

router.get('/questions/:slug', getQuestions);
router.post('/score', protect, submitScore);

module.exports = router;
