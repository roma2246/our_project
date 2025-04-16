const express = require('express');
const router = express.Router();
const { register, login, checkToken } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/check', checkToken);

module.exports = router; 