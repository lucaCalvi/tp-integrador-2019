const AuthController = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.post('/login', AuthController.loginUser);

module.exports = router;