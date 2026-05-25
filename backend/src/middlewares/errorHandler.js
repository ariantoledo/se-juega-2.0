function errorHandler(err, req, res, next) {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Ocurrió un error en el servidor',
    detalle: err.message
  });
}

module.exports = errorHandler;
