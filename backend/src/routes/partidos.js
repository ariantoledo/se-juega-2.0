const express = require('express');
const router = express.Router();
const partidosController = require('../controllers/partidosController');
const ensureAuthenticated = require('../middlewares/auth');
const authorizeRole = require('../middlewares/roles');

/**
 * @swagger
 * tags:
 *   name: Partidos
 *   description: Gestión de partidos
 */

/**
 * @swagger
 * /partidos:
 *   get:
 *     summary: Lista todos los partidos
 *     tags: [Partidos]
 *     responses:
 *       200:
 *         description: Devuelve la lista de partidos
 */
router.get('/', ensureAuthenticated, partidosController.getPartidos);

/**
 * @swagger
 * /partidos/{id}:
 *   get:
 *     summary: Obtiene un partido por ID
 *     tags: [Partidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del partido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Partido encontrado
 *       404:
 *         description: Partido no encontrado
 */
router.get('/:id', ensureAuthenticated, partidosController.getPartidoById);

/**
 * @swagger
 * /partidos:
 *   post:
 *     summary: Crea un nuevo partido (jugador/dueño/admin)
 *     tags: [Partidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reserva_id:
 *                 type: integer
 *               deporte:
 *                 type: string
 *               tipo:
 *                 type: string
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *               cancha_nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *               jugadores_necesarios:
 *                 type: integer
 *               costo_por_jugador:
 *                 type: number
 *               posiciones:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Partido creado
 */
router.post('/', ensureAuthenticated, authorizeRole('jugador','dueño','admin'), partidosController.createPartido);

/**
 * @swagger
 * /partidos/{id}:
 *   put:
 *     summary: Actualiza un partido existente
 *     tags: [Partidos]
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
 *         description: Partido actualizado
 *       404:
 *         description: Partido no encontrado
 */
router.put('/:id', ensureAuthenticated, authorizeRole('jugador','dueño','admin'), partidosController.updatePartido);

/**
 * @swagger
 * /partidos/{id}:
 *   delete:
 *     summary: Elimina un partido (solo admin/dueño)
 *     tags: [Partidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Partido eliminado
 *       404:
 *         description: Partido no encontrado
 */
router.delete('/:id', ensureAuthenticated, authorizeRole('admin','dueño'), partidosController.deletePartido);

module.exports = router;
