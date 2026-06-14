const pool = require('../config/db');

const Canchas = {
  async getAll() {
    const result = await pool.query('SELECT * FROM canchas');
    return result.rows;
  },

  async create({ establecimiento_id, nombre, deporte, capacidad, precio_total, precio_reserva, disponibilidad, estado }) {
    const deportesValidos = ['futbol5', 'futbol7', 'padel', 'tenis', 'pingpong'];
    const estadosValidos = ['activa', 'inactiva'];

    if (!deportesValidos.includes(deporte)) {
      throw new Error('Deporte inválido');
    }
    const estadoFinal = estadosValidos.includes(estado) ? estado : 'activa';

    const result = await pool.query(
      `INSERT INTO canchas (establecimiento_id, nombre, deporte, capacidad, precio_total, precio_reserva, disponibilidad, estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [establecimiento_id, nombre, deporte, capacidad, precio_total, precio_reserva, disponibilidad || null, estadoFinal]
    );
    return result.rows[0];
  },

  async update(id, { establecimiento_id, nombre, deporte, capacidad, precio_total, precio_reserva, disponibilidad, estado }) {
    const deportesValidos = ['futbol5', 'futbol7', 'padel', 'tenis', 'pingpong'];
    const estadosValidos = ['activa', 'inactiva'];

    if (deporte && !deportesValidos.includes(deporte)) {
      throw new Error('Deporte inválido');
    }
    if (estado && !estadosValidos.includes(estado)) {
      throw new Error('Estado inválido');
    }

    const result = await pool.query(
      `UPDATE canchas
       SET establecimiento_id=$1, nombre=$2, deporte=$3, capacidad=$4, precio_total=$5, precio_reserva=$6, disponibilidad=$7, estado=$8
       WHERE id=$9 RETURNING *`,
      [establecimiento_id, nombre, deporte, capacidad, precio_total, precio_reserva, disponibilidad || null, estado, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query(
      `DELETE FROM canchas WHERE id=$1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
};

module.exports = Canchas;
