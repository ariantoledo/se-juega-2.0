const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const ensureAuthenticated = require('../middlewares/auth');
const authorizeRole = require('../middlewares/roles');

// Solo admin puede ver y gestionar usuarios
router.get('/', ensureAuthenticated, authorizeRole('admin'), usuariosController.getUsuarios);
router.get('/:id', ensureAuthenticated, authorizeRole('admin'), usuariosController.getUsuarioById);
router.post('/', ensureAuthenticated, authorizeRole('admin'), usuariosController.createUsuario);
router.put('/:id', ensureAuthenticated, authorizeRole('admin'), usuariosController.updateUsuario);
router.delete('/:id', ensureAuthenticated, authorizeRole('admin'), usuariosController.deleteUsuario);

module.exports = router;
