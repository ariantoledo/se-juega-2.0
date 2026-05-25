const pool = require('../config/db');

const Usuarios = {
  async getAll() {
    const result = await pool.query('SELECT * FROM usuarios');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create({ nombre, email, password, rol, telefono, posicion, deporte_preferido }) {
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, email, password, rol, telefono, posicion, deporte_preferido)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, email, password, rol || 'jugador', telefono || null, posicion || null, deporte_preferido || null]
    );
    return result.rows[0];
  },

  async update(id, { nombre, email, rol, telefono, posicion, deporte_preferido, estado }) {
    const result = await pool.query(
      `UPDATE usuarios
       SET nombre = $1, email = $2, rol = $3, telefono = $4, posicion = $5, deporte_preferido = $6, estado = $7
       WHERE id = $8 RETURNING *`,
      [nombre, email, rol, telefono, posicion, deporte_preferido, estado, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query(
      `DELETE FROM usuarios WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
};

module.exports = Usuarios;
