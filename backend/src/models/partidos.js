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
    const deportesValidos = ['futbol', 'padel', 'tenis', 'pingpong'];
    const estadosValidos = ['programado', 'en curso', 'finalizado'];

    if (!deportesValidos.includes(deporte)) {
      throw new Error('Deporte inválido');
    }
    const estadoFinal = estadosValidos.includes(estado) ? estado : 'programado';

    const result = await pool.query(
      `INSERT INTO partidos (reserva_id, deporte, tipo, fecha_hora, cancha_nombre, direccion, jugadores_necesarios, costo_por_jugador, posiciones, estado)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [reserva_id, deporte, tipo, fecha_hora, cancha_nombre, direccion, jugadores_necesarios, costo_por_jugador || 0, posiciones || null, estadoFinal]
    );
    return result.rows[0];
  },

  async update(id, { reserva_id, deporte, tipo, fecha_hora, cancha_nombre, direccion, jugadores_necesarios, costo_por_jugador, posiciones, estado }) {
    const deportesValidos = ['futbol', 'padel', 'tenis', 'pingpong'];
    const estadosValidos = ['programado', 'en curso', 'finalizado'];

    if (deporte && !deportesValidos.includes(deporte)) {
      throw new Error('Deporte inválido');
    }
    if (estado && !estadosValidos.includes(estado)) {
      throw new Error('Estado inválido');
    }

    const result = await pool.query(
      `UPDATE partidos
       SET reserva_id=$1, deporte=$2, tipo=$3, fecha_hora=$4, cancha_nombre=$5, direccion=$6, jugadores_necesarios=$7, costo_por_jugador=$8, posiciones=$9, estado=$10
       WHERE id=$11 RETURNING *`,
      [reserva_id, deporte, tipo, fecha_hora, cancha_nombre, direccion, jugadores_necesarios, costo_por_jugador, posiciones, estado, id]
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
