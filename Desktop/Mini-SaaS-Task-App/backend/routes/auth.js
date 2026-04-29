const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
], authController.signup);

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
], authController.login);

module.exports = router;

