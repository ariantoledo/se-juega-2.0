// backend/src/middlewares/auth.js

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // Usuario autenticado con Google
  }
  res.status(401).json({ error: 'No estás autenticado con Google' });
}

module.exports = ensureAuthenticated;
