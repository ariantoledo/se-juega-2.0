function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Debes iniciar sesión' });
}

module.exports = ensureAuthenticated;
