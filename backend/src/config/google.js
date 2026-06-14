const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./db');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE google_id = $1 OR email = $2',
      [profile.id, profile.emails[0].value]
    );
    let usuario = result.rows[0];

    if (!usuario) {
      const insert = await pool.query(
        `INSERT INTO usuarios (google_id, nombre, email, rol)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [profile.id, profile.displayName, profile.emails[0].value, 'jugador']
      );
      usuario = insert.rows[0];
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
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    const usuario = result.rows[0];
    done(null, usuario); // rol actualizado
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
