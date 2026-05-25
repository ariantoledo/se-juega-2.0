const Reservas = require('../models/reservas');

exports.getReservas = async (req, res) => {
  try {
    const reservas = await Reservas.getAll();
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};

exports.getReservaById = async (req, res) => {
  try {
    const reserva = await Reservas.getById(req.params.id);
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reserva' });
  }
};

exports.createReserva = async (req, res) => {
  try {
    const nueva = await Reservas.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear reserva' });
  }
};

exports.updateReserva = async (req, res) => {
  try {
    const actualizada = await Reservas.update(req.params.id, req.body);
    if (!actualizada) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar reserva' });
  }
};

exports.deleteReserva = async (req, res) => {
  try {
    const eliminada = await Reservas.delete(req.params.id);
    if (!eliminada) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json({ mensaje: 'Reserva eliminada', eliminada });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar reserva' });
  }
};

