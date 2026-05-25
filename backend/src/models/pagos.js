const pool = require('../config/db');

const Pagos = {
  async getAll() {
    const result = await pool.query('SELECT * FROM pagos');
    return result.rows;
  },

  async create({ usuario_id, monto, tipo, estado, comision }) {
    const result = await pool.query(
      `INSERT INTO pagos (usuario_id, monto, tipo, estado, comision)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [usuario_id, monto, tipo, estado, comision]
    );
    return result.rows[0];
  },

  async updateEstado(id, estado) {
    const result = await pool.query(
      `UPDATE pagos SET estado = $1 WHERE id = $2 RETURNING *`,
      [estado, id]
    );
    return result.rows[0];
  }
};

module.exports = Pagos;
