require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('./src/config/google');
const errorHandler = require('./src/middlewares/errorHandler');

const routes = require('./src/routes/index'); // NUEVO

const app = express();

// Seguridad básica
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Configuración de sesión
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas centralizadas
app.use('/', routes);

// Middleware de errores
app.use(errorHandler);

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});