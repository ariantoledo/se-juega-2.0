const Partidos = require('../models/partidos');

exports.getPartidos = async (req, res) => {
  try {
    const partidos = await Partidos.getAll();
    res.json(partidos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener partidos' });
  }
};

exports.getPartidoById = async (req, res) => {
  try {
    const partido = await Partidos.getById(req.params.id);
    if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });
    res.json(partido);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener partido' });
  }
};

exports.createPartido = async (req, res) => {
  try {
    const nuevo = await Partidos.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear partido' });
  }
};

exports.updatePartido = async (req, res) => {
  try {
    const actualizado = await Partidos.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ error: 'Partido no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar partido' });
  }
};

exports.deletePartido = async (req, res) => {
  try {
    const eliminado = await Partidos.delete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Partido no encontrado' });
    res.json({ mensaje: 'Partido eliminado', eliminado });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar partido' });
  }
};
