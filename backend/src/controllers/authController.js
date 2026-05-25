exports.googleCallback = (req, res) => {
  // Si llega acá, Google ya autenticó al usuario
  res.json({
    mensaje: 'Login exitoso con Google',
    usuario: req.user
  });
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ mensaje: 'Sesión cerrada' });
  });
};
