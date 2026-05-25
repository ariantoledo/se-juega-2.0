const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');
const ensureAuthenticated = require('../middlewares/auth');
const authorizeRole = require('../middlewares/roles');

// Jugadores pueden crear reservas, admin/dueño pueden ver todas
router.get('/', ensureAuthenticated, authorizeRole('admin', 'dueño'), reservasController.getReservas);
router.get('/:id', ensureAuthenticated, reservasController.getReservaById);
router.post('/', ensureAuthenticated, authorizeRole('jugador', 'dueño', 'admin'), reservasController.createReserva);
router.put('/:id', ensureAuthenticated, authorizeRole('jugador', 'dueño', 'admin'), reservasController.updateReserva);
router.delete('/:id', ensureAuthenticated, authorizeRole('admin', 'dueño'), reservasController.deleteReserva);

module.exports = router;
