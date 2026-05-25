const pool = require('../config/db');

const Canchas = {
  async getAll() {
    const result = await pool.query('SELECT * FROM canchas');
    return result.rows;
  },

  async create({ establecimiento_id, nombre, deporte, capacidad }) {
    const result = await pool.query(
      `INSERT INTO canchas (establecimiento_id, nombre, deporte, capacidad)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [establecimiento_id, nombre, deporte, capacidad]
    );
    return result.rows[0];
  }
};

module.exports = Canchas;
