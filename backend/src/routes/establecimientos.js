const express = require('express');
const router = express.Router();
const establecimientosController = require('../controllers/establecimientosController');
const authorizeRole = require('../middlewares/roles');
const ensureAuthenticated = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Establecimientos
 *   description: Gestión de establecimientos (dueño/admin)
 */

/**
 * @swagger
 * /establecimientos:
 *   get:
 *     summary: Lista todos los establecimientos
 *     tags: [Establecimientos]
 *     responses:
 *       200:
 *         description: Devuelve la lista de establecimientos
 */
router.get('/', establecimientosController.getEstablecimientos);

/**
 * @swagger
 * /establecimientos:
 *   post:
 *     summary: Crea un nuevo establecimiento (dueño/admin)
 *     tags: [Establecimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *               localidad:
 *                 type: string
 *               telefono_contacto:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Establecimiento creado
 */
router.post(
  '/',
  ensureAuthenticated,
  (req, res, next) => {
    console.log('Usuario en sesión:', req.user);
    next();
  },
  authorizeRole('dueño', 'admin'),
  establecimientosController.createEstablecimiento
);

/**
 * @swagger
 * /establecimientos/{id}:
 *   put:
 *     summary: Actualiza un establecimiento existente (dueño/admin)
 *     tags: [Establecimientos]
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
 *         description: Establecimiento actualizado
 *       404:
 *         description: Establecimiento no encontrado
 */
router.put(
  '/:id',
  ensureAuthenticated,
  (req, res, next) => {
    console.log('Usuario en sesión:', req.user);
    next();
  },
  authorizeRole('dueño', 'admin'),
  establecimientosController.updateEstablecimiento
);

/**
 * @swagger
 * /establecimientos/{id}:
 *   delete:
 *     summary: Elimina un establecimiento (dueño/admin)
 *     tags: [Establecimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Establecimiento eliminado
 *       404:
 *         description: Establecimiento no encontrado
 */
router.delete(
  '/:id',
  ensureAuthenticated,
  (req, res, next) => {
    console.log('Usuario en sesión:', req.user);
    next();
  },
  authorizeRole('dueño', 'admin'),
  establecimientosController.deleteEstablecimiento
);

module.exports = router;
