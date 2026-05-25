const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',          // tu usuario
  host: 'localhost',         // servidor local
  database: 'se_juega',      // nombre de la base
  password: '47412511', // la que pusiste en la instalación
  port: 5432,
});

module.exports = pool;
