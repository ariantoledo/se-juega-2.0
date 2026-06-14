function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    const userRole = req.user.rol; // asegúrate que la columna en DB sea "rol"
    console.log('Rol del usuario en sesión:', userRole);

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'No tienes permisos para esta acción' });
    }

    next();
  };
}

module.exports = authorizeRole;