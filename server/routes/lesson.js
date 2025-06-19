const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const auth = require('../middleware/auth');

// Get all lessons
router.get('/', lessonController.getAllLessons);
// Add new lesson (protected)
router.post('/', auth, lessonController.createLesson);

module.exports = router;
