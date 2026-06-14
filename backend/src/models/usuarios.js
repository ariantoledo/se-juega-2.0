const pool = require('../config/db');

// Crear usuario
async function createUsuario({ nombre, email, telefono, posicion, deporte_preferido, rol, estado, deportes_notificaciones }) {
  const result = await pool.query(
    `INSERT INTO usuarios 
     (nombre, email, telefono, posicion, deporte_preferido, rol, estado, deportes_notificaciones, fecha_registro)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
     RETURNING *`,
    [nombre, email, telefono, posicion, deporte_preferido, rol, estado, deportes_notificaciones]
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
async function updateUsuario(id, { nombre, email, telefono, posicion, deporte_preferido, rol, estado, deportes_notificaciones }) {
  const result = await pool.query(
    `UPDATE usuarios
     SET nombre = $1, email = $2, telefono = $3, posicion = $4, deporte_preferido = $5,
         rol = $6, estado = $7, deportes_notificaciones = $8
     WHERE id = $9
     RETURNING *`,
    [nombre, email, telefono, posicion, deporte_preferido, rol, estado, deportes_notificaciones, id]
  );
  return result.rows[0];
}

// Eliminar usuario
async function deleteUsuario(id) {
  const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

// 👇 Export estandarizado
module.exports = {
  create: createUsuario,
  getAll: getUsuarios,
  getById: getUsuarioById,
  update: updateUsuario,
  delete: deleteUsuario
};
