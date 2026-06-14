const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');
const ensureAuthenticated = require('../middlewares/auth');
const authorizeRole = require('../middlewares/roles');

/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Gestión de reservas
 */

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Lista todas las reservas (solo admin/dueño)
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Devuelve la lista de reservas
 */
router.get('/', ensureAuthenticated, authorizeRole('admin', 'dueño'), reservasController.getReservas);

/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Obtiene una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', ensureAuthenticated, reservasController.getReservaById);

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crea una nueva reserva (jugador/dueño/admin)
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               establecimiento_id:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               hora:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reserva creada
 */
router.post('/', ensureAuthenticated, authorizeRole('jugador', 'dueño', 'admin'), reservasController.createReserva);

/**
 * @swagger
 * /reservas/{id}:
 *   put:
 *     summary: Actualiza una reserva existente
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Reserva actualizada
 *       404:
 *         description: Reserva no encontrada
 */
router.put('/:id', ensureAuthenticated, authorizeRole('jugador', 'dueño', 'admin'), reservasController.updateReserva);

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Elimina una reserva (solo admin/dueño)
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva eliminada
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/:id', ensureAuthenticated, authorizeRole('admin', 'dueño'), reservasController.deleteReserva);

module.exports = router;
