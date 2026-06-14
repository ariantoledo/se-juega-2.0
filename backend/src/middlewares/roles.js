function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    // Normaliza el rol: acepta rol o role, quita espacios y pasa a minúsculas
    const userRole = (req.user.rol || req.user.role || '').toString().trim().toLowerCase();
    const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());

    console.log('Rol detectado:', userRole);
    console.log('Roles permitidos:', normalizedAllowed);

    if (!normalizedAllowed.includes(userRole)) {
      return res.status(403).json({ error: 'No tienes permisos para esta acción' });
    }

    next();
  };
}

module.exports = authorizeRole;
