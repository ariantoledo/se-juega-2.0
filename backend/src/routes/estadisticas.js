const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticasController');

/**
 * @swagger
 * tags:
 *   name: Estadísticas
 *   description: Gestión de estadísticas de jugadores y partidos
 */

/**
 * @swagger
 * /estadisticas:
 *   get:
 *     summary: Lista todas las estadísticas
 *     tags: [Estadísticas]
 *     responses:
 *       200:
 *         description: Devuelve la lista de estadísticas
 */
router.get('/', estadisticasController.getEstadisticas);

/**
 * @swagger
 * /estadisticas:
 *   post:
 *     summary: Crea una nueva estadística
 *     tags: [Estadísticas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               partido_id:
 *                 type: integer
 *               asistencia:
 *                 type: boolean
 *               confiabilidad:
 *                 type: number
 *                 description: Valor de 0 a 100
 *     responses:
 *       201:
 *         description: Estadística creada
 */
router.post('/', estadisticasController.createEstadistica);

module.exports = router;
