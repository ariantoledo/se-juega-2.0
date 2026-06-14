const Establecimientos = require('../models/establecimientos');

// Obtener todos los establecimientos
exports.getEstablecimientos = async (req, res) => {
  try {
    const establecimientos = await Establecimientos.getAll();
    res.json(establecimientos);
  } catch (err) {
    console.error('Error al obtener establecimientos:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Crear establecimiento
exports.createEstablecimiento = async (req, res) => {
  try {
    const nuevo = await Establecimientos.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error al crear establecimiento:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar establecimiento
exports.updateEstablecimiento = async (req, res) => {
  try {
    const actualizado = await Establecimientos.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ error: 'Establecimiento no encontrado' });
    res.json(actualizado);
  } catch (err) {
    console.error('Error al actualizar establecimiento:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar establecimiento
exports.deleteEstablecimiento = async (req, res) => {
  try {
    const eliminado = await Establecimientos.delete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Establecimiento no encontrado' });
    res.json({ mensaje: 'Establecimiento eliminado', eliminado });
  } catch (err) {
    console.error('Error al eliminar establecimiento:', err.message);
    res.status(500).json({ error: err.message });
  }
};
