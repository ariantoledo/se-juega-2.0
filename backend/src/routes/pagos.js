const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagosController');

/**
 * @swagger
 * tags:
 *   name: Pagos
 *   description: Gestión de pagos
 */

/**
 * @swagger
 * /pagos:
 *   get:
 *     summary: Lista todos los pagos
 *     tags: [Pagos]
 *     responses:
 *       200:
 *         description: Devuelve la lista de pagos
 */
router.get('/', pagosController.getPagos);

/**
 * @swagger
 * /pagos:
 *   post:
 *     summary: Crea un nuevo pago
 *     tags: [Pagos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               monto:
 *                 type: number
 *               tipo:
 *                 type: string
 *               estado:
 *                 type: string
 *               comision:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pago creado
 */
router.post('/', pagosController.createPago);

/**
 * @swagger
 * /pagos/{id}/estado:
 *   put:
 *     summary: Actualiza el estado de un pago
 *     tags: [Pagos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pago
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estado del pago actualizado
 *       404:
 *         description: Pago no encontrado
 */
router.put('/:id/estado', pagosController.updateEstadoPago);

module.exports = router;
