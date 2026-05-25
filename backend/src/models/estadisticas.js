const pool = require('../config/db');

const Estadisticas = {
  async getAll() {
    const result = await pool.query('SELECT * FROM estadisticas');
    return result.rows;
  },

  async create({ usuario_id, partido_id, asistencia, fecha }) {
    const result = await pool.query(
      `INSERT INTO estadisticas (usuario_id, partido_id, asistencia, fecha)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [usuario_id, partido_id, asistencia, fecha]
    );
    return result.rows[0];
  }
};

module.exports = Estadisticas;
