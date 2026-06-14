const pool = require('../config/db');

const Establecimientos = {
  async getAll() {
    const result = await pool.query('SELECT * FROM establecimientos');
    return result.rows;
  },

  async create({ nombre, direccion, localidad, dueño_id, estado, telefono_contacto, descripcion }) {
    const estadosValidos = ['activo', 'inactivo'];
    const estadoFinal = estadosValidos.includes(estado) ? estado : 'activo';

    const result = await pool.query(
      `INSERT INTO establecimientos (nombre, direccion, localidad, dueño_id, estado, telefono_contacto, descripcion)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, direccion, localidad, dueño_id, estadoFinal, telefono_contacto || null, descripcion || null]
    );
    return result.rows[0];
  },

  async update(id, { nombre, direccion, localidad, dueño_id, estado, telefono_contacto, descripcion }) {
    const estadosValidos = ['activo', 'inactivo'];
    if (estado && !estadosValidos.includes(estado)) {
      throw new Error('Estado inválido');
    }

    const result = await pool.query(
      `UPDATE establecimientos
       SET nombre = $1, direccion = $2, localidad = $3, dueño_id = $4, estado = $5, telefono_contacto = $6, descripcion = $7
       WHERE id = $8 RETURNING *`,
      [nombre, direccion, localidad, dueño_id, estado, telefono_contacto || null, descripcion || null, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query(
      `DELETE FROM establecimientos WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
};

module.exports = Establecimientos;
