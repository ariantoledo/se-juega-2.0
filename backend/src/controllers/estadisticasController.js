const Estadisticas = require('../models/estadisticas');

exports.getEstadisticas = async (req, res) => {
  try {
    const estadisticas = await Estadisticas.getAll();
    res.json(estadisticas);
  } catch (err) {
    res.status(500).send('Error al obtener estadísticas');
  }
};

exports.createEstadistica = async (req, res) => {
  try {
    const nueva = await Estadisticas.create(req.body);
    res.json(nueva);
  } catch (err) {
    res.status(500).send('Error al crear estadística');
  }
};
