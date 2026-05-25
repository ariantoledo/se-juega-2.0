const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticasController');

router.get('/', estadisticasController.getEstadisticas);
router.post('/', estadisticasController.createEstadistica);

module.exports = router;
