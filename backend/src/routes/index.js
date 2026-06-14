const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuarios');
const reservasRoutes = require('./reservas');
const partidosRoutes = require('./partidos');
const pagosRoutes = require('./pagos');
const estadisticasRoutes = require('./estadisticas');
const establecimientosRoutes = require('./establecimientos');
const canchasRoutes = require('./canchas');
const authRoutes = require('./auth');

const ensureAuthenticated = require('../middlewares/auth');
const authorizeRole = require('../middlewares/roles');
const { validateUsuario, validateReserva } = require('../middlewares/validation');

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas protegidas
router.use('/usuarios', ensureAuthenticated, authorizeRole('admin'), validateUsuario, usuariosRoutes);
router.use('/reservas', ensureAuthenticated, validateReserva, reservasRoutes);
router.use('/partidos', ensureAuthenticated, partidosRoutes);
router.use('/pagos', ensureAuthenticated, pagosRoutes);
router.use('/estadisticas', ensureAuthenticated, estadisticasRoutes);
router.use('/establecimientos', ensureAuthenticated, authorizeRole('dueño'), establecimientosRoutes);
router.use('/canchas', ensureAuthenticated, authorizeRole('dueño'), canchasRoutes);

module.exports = router;
