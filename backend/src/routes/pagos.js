const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagosController');

router.get('/', pagosController.getPagos);
router.post('/', pagosController.createPago);
router.put('/:id/estado', pagosController.updateEstadoPago);

module.exports = router;
