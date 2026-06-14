const pool = require('../config/db');

// Crear usuario
async function createUsuario({ nombre, email, rol, estado, deportes_notificaciones }) {
  const result = await pool.query(
    `INSERT INTO usuarios (nombre, email, rol, estado, deportes_notificaciones)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [nombre, email, rol, estado, deportes_notificaciones]
  );
  return result.rows[0];
}

// Obtener todos los usuarios
async function getUsuarios() {
  const result = await pool.query('SELECT * FROM usuarios');
  return result.rows;
}

// Obtener usuario por ID
async function getUsuarioById(id) {
  const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  return result.rows[0];
}

// Actualizar usuario
async function updateUsuario(id, { nombre, email, rol, estado, deportes_notificaciones }) {
  const result = await pool.query(
    `UPDATE usuarios
     SET nombre = $1, email = $2, rol = $3, estado = $4, deportes_notificaciones = $5
     WHERE id = $6
     RETURNING *`,
    [nombre, email, rol, estado, deportes_notificaciones, id]
  );
  return result.rows[0];
}

// Eliminar usuario
async function deleteUsuario(id) {
  const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
};
