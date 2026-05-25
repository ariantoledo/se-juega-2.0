const pool = require('../config/db');

const Partidos = {
  async getAll() {
    const result = await pool.query('SELECT * FROM partidos');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM partidos WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create({ reserva_id, deporte, tipo, fecha_hora, cancha_nombre, direccion, jugadores_necesarios, costo_por_jugador, posiciones, estado }) {
    const result = await pool.query(
      `INSERT INTO partidos (reserva_id, deporte, tipo, fecha_hora, cancha_nombre, direccion, jugadores_necesarios, costo_por_jugador, posiciones, estado)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [reserva_id, deporte, tipo, fecha_hora, cancha_nombre, direccion, jugadores_necesarios, costo_por_jugador || 0, posiciones || null, estado || 'programado']
    );
    return result.rows[0];
  },

  async update(id, { deporte, tipo, fecha_hora, cancha_nombre, direccion, jugadores_necesarios, costo_por_jugador, posiciones, estado }) {
    const result = await pool.query(
      `UPDATE partidos
       SET deporte=$1, tipo=$2, fecha_hora=$3, cancha_nombre=$4, direccion=$5, jugadores_necesarios=$6, costo_por_jugador=$7, posiciones=$8, estado=$9
       WHERE id=$10 RETURNING *`,
      [deporte, tipo, fecha_hora, cancha_nombre, direccion, jugadores_necesarios, costo_por_jugador, posiciones, estado, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query(
      `DELETE FROM partidos WHERE id=$1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
};

module.exports = Partidos;
