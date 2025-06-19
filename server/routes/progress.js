const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const auth = require('../middleware/auth');

router.post('/complete', auth, progressController.completeLesson);

module.exports = router;
