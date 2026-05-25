const express = require('express');
const router = express.Router();
const partidosController = require('../controllers/partidosController');
const ensureAuthenticated = require('../middlewares/auth');
const authorizeRole = require('../middlewares/roles');

// Admin y dueño pueden ver todos, jugadores pueden crear/editar sus partidos
router.get('/', ensureAuthenticated, partidosController.getPartidos);
router.get('/:id', ensureAuthenticated, partidosController.getPartidoById);
router.post('/', ensureAuthenticated, authorizeRole('jugador','dueño','admin'), partidosController.createPartido);
router.put('/:id', ensureAuthenticated, authorizeRole('jugador','dueño','admin'), partidosController.updatePartido);
router.delete('/:id', ensureAuthenticated, authorizeRole('admin','dueño'), partidosController.deletePartido);

module.exports = router;
