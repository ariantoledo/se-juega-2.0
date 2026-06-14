const pool = require('../config/db');

const Pagos = {
  async getAll() {
    const result = await pool.query('SELECT * FROM pagos');
    return result.rows;
  },

  async create({ usuario_id, monto, tipo, estado, comision }) {
    const estadosValidos = ['pendiente', 'aprobado', 'rechazado'];
    const estadoFinal = estadosValidos.includes(estado) ? estado : 'pendiente';

    const result = await pool.query(
      `INSERT INTO pagos (usuario_id, monto, tipo, estado, comision, fecha)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [usuario_id, monto, tipo, estadoFinal, comision || 0]
    );
    return result.rows[0];
  },

  async updatePago(id, { usuario_id, monto, tipo, estado, comision }) {
    const estadosValidos = ['pendiente', 'aprobado', 'rechazado'];
    if (estado && !estadosValidos.includes(estado)) {
      throw new Error('Estado inválido');
    }

    const result = await pool.query(
      `UPDATE pagos
       SET usuario_id = $1, monto = $2, tipo = $3, estado = $4, comision = $5
       WHERE id = $6 RETURNING *`,
      [usuario_id, monto, tipo, estado, comision, id]
    );
    return result.rows[0];
  },

  async updateEstado(id, estado) {
    const estadosValidos = ['pendiente', 'aprobado', 'rechazado'];
    if (!estadosValidos.includes(estado)) {
      throw new Error('Estado inválido');
    }

    const result = await pool.query(
      `UPDATE pagos SET estado = $1 WHERE id = $2 RETURNING *`,
      [estado, id]
    );
    return result.rows[0];
  }
};

module.exports = Pagos;
