const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuarios = require('../models/usuarios'); // importa tu módulo

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Buscar usuario por email
    const todos = await Usuarios.getAll();
    let usuario = todos.find(u => u.google_id === profile.id || u.email === profile.emails[0].value);

    if (!usuario) {
      // Crear nuevo usuario si no existe
      usuario = await Usuarios.create({
        nombre: profile.displayName,
        email: profile.emails[0].value,
        rol: 'jugador'
      });
    }

    return done(null, usuario);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const todos = await Usuarios.getAll();
    const usuario = todos.find(u => u.id === id);
    done(null, usuario);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
