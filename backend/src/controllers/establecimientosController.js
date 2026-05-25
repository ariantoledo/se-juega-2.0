const Establecimientos = require('../models/establecimientos');

exports.getEstablecimientos = async (req, res) => {
  try {
    const establecimientos = await Establecimientos.getAll();
    res.json(establecimientos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener establecimientos' });
  }
};

exports.createEstablecimiento = async (req, res) => {
  try {
    const nuevo = await Establecimientos.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear establecimiento' });
  }
};

exports.updateEstablecimiento = async (req, res) => {
  try {
    const actualizado = await Establecimientos.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ error: 'Establecimiento no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar establecimiento' });
  }
};

exports.deleteEstablecimiento = async (req, res) => {
  try {
    const eliminado = await Establecimientos.delete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Establecimiento no encontrado' });
    res.json({ mensaje: 'Establecimiento eliminado', eliminado });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar establecimiento' });
  }
};
