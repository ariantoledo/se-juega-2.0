const pool = require('../config/db');

const Estadisticas = {
  async getAll() {
    const result = await pool.query('SELECT * FROM estadisticas');
    return result.rows;
  },

  async getByUsuario(usuario_id) {
    const result = await pool.query(
      'SELECT * FROM estadisticas WHERE usuario_id = $1',
      [usuario_id]
    );
    return result.rows;
  },

  async getByPartido(partido_id) {
    const result = await pool.query(
      'SELECT * FROM estadisticas WHERE partido_id = $1',
      [partido_id]
    );
    return result.rows;
  },

  async create({ usuario_id, partido_id, asistencia, fecha }) {
    const asistenciaFinal = asistencia ? true : false;

    const result = await pool.query(
      `INSERT INTO estadisticas (usuario_id, partido_id, asistencia, fecha)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [usuario_id, partido_id, asistenciaFinal, fecha || new Date()]
    );
    return result.rows[0];
  },

  async updateAsistencia(id, asistencia) {
    const asistenciaFinal = asistencia ? true : false;

    const result = await pool.query(
      `UPDATE estadisticas
       SET asistencia = $1
       WHERE id = $2 RETURNING *`,
      [asistenciaFinal, id]
    );
    return result.rows[0];
  }
};

module.exports = Estadisticas;
