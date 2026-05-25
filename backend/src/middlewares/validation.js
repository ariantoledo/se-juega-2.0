function validateUsuario(req, res, next) {
  const { nombre, email, rol } = req.body;
  if (!nombre || !email || !rol) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: nombre, email, rol' });
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Formato de email inválido' });
  }
  next();
}

function validateReserva(req, res, next) {
  const { cancha_id, usuario_id, fecha } = req.body;
  if (!cancha_id || !usuario_id || !fecha) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: cancha_id, usuario_id, fecha' });
  }
  next();
}

module.exports = { validateUsuario, validateReserva };
