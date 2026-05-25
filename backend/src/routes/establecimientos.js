const express = require('express');
const router = express.Router();
const establecimientosController = require('../controllers/establecimientosController');
const authorizeRole = require('../middlewares/roles');
const ensureAuthenticated = require('../middlewares/auth'); // si ya lo tenés

router.get('/', establecimientosController.getEstablecimientos);

router.post('/', ensureAuthenticated, authorizeRole('dueño', 'admin'), establecimientosController.createEstablecimiento);

router.put('/:id', ensureAuthenticated, authorizeRole('dueño', 'admin'), establecimientosController.updateEstablecimiento);

router.delete('/:id', ensureAuthenticated, authorizeRole('dueño', 'admin'), establecimientosController.deleteEstablecimiento);

module.exports = router;
