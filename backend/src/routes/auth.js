const express = require('express');
const router = express.Router();
const passport = require('../config/google');
const authController = require('../controllers/authController');

// Iniciar login con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback de Google
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  authController.googleCallback
);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
