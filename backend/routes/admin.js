const express = require('express');
const router = express.Router();
const { getSummaryData } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/summary', protect, admin, getSummaryData);

module.exports = router;
