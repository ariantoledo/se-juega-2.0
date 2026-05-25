const Canchas = require('../models/canchas');

exports.getCanchas = async (req, res) => {
  try {
    const canchas = await Canchas.getAll();
    res.json(canchas);
  } catch (err) {
    res.status(500).send('Error al obtener canchas');
  }
};

exports.createCancha = async (req, res) => {
  try {
    const nueva = await Canchas.create(req.body);
    res.json(nueva);
  } catch (err) {
    res.status(500).send('Error al crear cancha');
  }
};
