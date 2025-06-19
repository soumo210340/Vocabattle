const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/:id', userController.getUser);
router.get('/me', auth, userController.getProfile);

module.exports = router;
