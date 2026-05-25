require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('./src/config/google');

// Middlewares
const errorHandler = require('./src/middlewares/errorHandler');
const ensureAuthenticated = require('./src/middlewares/auth');
const { validateUsuario, validateReserva } = require('./src/middlewares/validation');
const authorizeRole = require('./src/middlewares/roles');

// Rutas
const usuariosRoutes = require('./src/routes/usuarios');
const reservasRoutes = require('./src/routes/reservas');
const partidosRoutes = require('./src/routes/partidos');
const pagosRoutes = require('./src/routes/pagos');
const estadisticasRoutes = require('./src/routes/estadisticas');
const establecimientosRoutes = require('./src/routes/establecimientos');
const canchasRoutes = require('./src/routes/canchas');
const authRoutes = require('./src/routes/auth');

const app = express();

// Seguridad básica
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Configuración de sesión para Google OAuth
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas protegidas con autenticación y roles
app.use('/usuarios', ensureAuthenticated, authorizeRole('admin'), validateUsuario, usuariosRoutes);
app.use('/reservas', ensureAuthenticated, validateReserva, reservasRoutes);
app.use('/partidos', ensureAuthenticated, partidosRoutes);
app.use('/pagos', ensureAuthenticated, pagosRoutes);
app.use('/estadisticas', ensureAuthenticated, estadisticasRoutes);
app.use('/establecimientos', ensureAuthenticated, authorizeRole('dueño'), establecimientosRoutes);
app.use('/canchas', ensureAuthenticated, authorizeRole('dueño'), canchasRoutes);

// Middleware de errores al final
app.use(errorHandler);

// Puerto
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
