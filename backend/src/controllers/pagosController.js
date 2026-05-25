const Pagos = require('../models/pagos');

exports.getPagos = async (req, res) => {
  try {
    const pagos = await Pagos.getAll();
    res.json(pagos);
  } catch (err) {
    res.status(500).send('Error al obtener pagos');
  }
};

exports.createPago = async (req, res) => {
  try {
    const nuevo = await Pagos.create(req.body);
    res.json(nuevo);
  } catch (err) {
    res.status(500).send('Error al crear pago');
  }
};

exports.updateEstadoPago = async (req, res) => {
  try {
    const actualizado = await Pagos.updateEstado(req.params.id, req.body.estado);
    res.json(actualizado);
  } catch (err) {
    res.status(500).send('Error al actualizar estado del pago');
  }
};
