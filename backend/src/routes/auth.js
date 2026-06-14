const express = require('express');
const router = express.Router();
const passport = require('../config/google');
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Login con Google y gestión de sesión
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Inicia login con Google
 *     tags: [Autenticación]
 *     responses:
 *       302:
 *         description: Redirige a la página de login de Google
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback de Google OAuth
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Login exitoso con Google
 *       401:
 *         description: Fallo en la autenticación
 */
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  authController.googleCallback
);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Cierra la sesión del usuario
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 */
router.get('/logout', authController.logout);

module.exports = router;
