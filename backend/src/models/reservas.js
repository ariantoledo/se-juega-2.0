const pool = require('../config/db');

const Reservas = {
  async getAll() {
    const result = await pool.query('SELECT * FROM reservas');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM reservas WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create({ usuario_id, establecimiento_id, fecha, hora, estado }) {
    const result = await pool.query(
      `INSERT INTO reservas (usuario_id, establecimiento_id, fecha, hora, estado)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [usuario_id, establecimiento_id, fecha, hora, estado || 'pendiente']
    );
    return result.rows[0];
  },

  async update(id, { fecha, hora, estado }) {
    const result = await pool.query(
      `UPDATE reservas
       SET fecha = $1, hora = $2, estado = $3
       WHERE id = $4 RETURNING *`,
      [fecha, hora, estado, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query(
      `DELETE FROM reservas WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
};

module.exports = Reservas;
