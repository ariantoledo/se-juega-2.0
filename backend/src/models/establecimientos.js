const pool = require('../config/db');

const Establecimientos = {
  async getAll() {
    const result = await pool.query('SELECT * FROM establecimientos');
    return result.rows;
  },

  async create({ nombre, direccion, localidad, dueño_id, estado, telefono_contacto, descripcion }) {
    const result = await pool.query(
      `INSERT INTO establecimientos (nombre, direccion, localidad, dueño_id, estado, telefono_contacto, descripcion)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, direccion, localidad, dueño_id, estado, telefono_contacto || null, descripcion || null]
    );
    return result.rows[0];
  },

  async update(id, { nombre, direccion, localidad, estado, telefono_contacto, descripcion }) {
    const result = await pool.query(
      `UPDATE establecimientos
       SET nombre = $1, direccion = $2, localidad = $3, estado = $4, telefono_contacto = $5, descripcion = $6
       WHERE id = $7 RETURNING *`,
      [nombre, direccion, localidad, estado, telefono_contacto || null, descripcion || null, id]
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
