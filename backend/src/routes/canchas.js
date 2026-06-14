const express = require('express');
const router = express.Router();
const canchasController = require('../controllers/canchasController');

/**
 * @swagger
 * tags:
 *   name: Canchas
 *   description: Gestión de canchas dentro de los establecimientos
 */

/**
 * @swagger
 * /canchas:
 *   get:
 *     summary: Lista todas las canchas
 *     tags: [Canchas]
 *     responses:
 *       200:
 *         description: Devuelve la lista de canchas
 */
router.get('/', canchasController.getCanchas);

/**
 * @swagger
 * /canchas:
 *   post:
 *     summary: Crea una nueva cancha
 *     tags: [Canchas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               establecimiento_id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 description: 'Ejemplo: fútbol, tenis, básquet'
 *               estado:
 *                 type: string
 *                 description: Estado de la cancha (disponible, en mantenimiento)
 *     responses:
 *       201:
 *         description: Cancha creada
 */
router.post('/', canchasController.createCancha);

module.exports = router;
