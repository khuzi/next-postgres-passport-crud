import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import pool from "../db";

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, name, password, done) => {
      pool.query(
        `SELECT * FROM users
        WHERE email = $1`,
        [name],
        (err, results) => {
          if (err) {
            return done(err);
          }
          const user = results.rows[0];
          if (!user) {
            return done(null, false);
          } else {
            bcrypt.compare(password, user.password, (err, res) => {
              if (err) {
                console.log("Error while checking password");
                return done();
              } else if (res) {
                return done(null, {
                  name: user.name,
                  email: user.email,
                });
              } else {
                return done(null, false);
              }
            });
          }
        }
      );
    }
  )
);

export default passport;
