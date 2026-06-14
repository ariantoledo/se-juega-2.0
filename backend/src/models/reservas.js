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
    const estadosValidos = ['pendiente', 'confirmada', 'cancelada'];
    const estadoFinal = estadosValidos.includes(estado) ? estado : 'pendiente';

    const result = await pool.query(
      `INSERT INTO reservas (usuario_id, establecimiento_id, fecha, hora, estado)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [usuario_id, establecimiento_id, fecha, hora, estadoFinal]
    );
    return result.rows[0];
  },

  async update(id, { usuario_id, establecimiento_id, fecha, hora, estado }) {
    const estadosValidos = ['pendiente', 'confirmada', 'cancelada'];
    if (estado && !estadosValidos.includes(estado)) {
      throw new Error('Estado inválido');
    }

    const result = await pool.query(
      `UPDATE reservas
       SET usuario_id = $1, establecimiento_id = $2, fecha = $3, hora = $4, estado = $5
       WHERE id = $6 RETURNING *`,
      [usuario_id, establecimiento_id, fecha, hora, estado, id]
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
