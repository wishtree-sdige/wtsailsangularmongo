const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const FacebookStrategy = require('passport-facebook').Strategy;
const request = require('request');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((req, id, done) => {
  User.findOne({ id }, (err, userData) => {
    done(err, userData);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
},
((req, username, password, done) => {
  User.findOne({ email: username, isActive: true, isVerified: true }, (err, user) => {
    if (err) {
      Logger.err(`Passport : at User.findOne ${err}`);
      return done(err);
    }
    Logger.verbose(user);
    if (!user) {
      Logger.warn({ message: 'User Incorrect Username' });
      return done(null, false, { message: 'Incorrect Username' });
    }
    if (!user.password) {
      Logger.warn({ message: 'User Incorrect Password' });
      return done(null, false, { message: 'Incorrect Password' });
    }
    bcrypt.compare(password, user.password, (bcryptErr, res) => {
      if (bcryptErr) {
        return done(bcryptErr);
      }
      if (!res) {
        Logger.warn({ message: 'Res Incorrect Username' });
        return done(null, false, { message: 'Incorrect Password' });
      }
      Logger.info({ message: 'Logged In Successfully' });
      return done(null, user, { message: 'Logged In Successfully' });
    });
  });
})));


const verifyHandler = function (req, token, tokenSecret, profile, done) {
  Logger.verbose('verifyHandler');
  process.nextTick(() => {
    let url = 'https://graph.facebook.com/v2.10/me?access_token=%s&fields=id,email,first_name,last_name';
    url = url.replace('%s', token);

    const options = { method: 'GET', url, json: true };
    request(options, (err, response) => {
      if (err) {
        return done(null, null);
      }
      Logger.verbose(response);

      const data = {
        id: response.body.id,
        first_name: response.body.first_name,
        last_name: response.body.last_name,
        email: response.body.email,
      };

      return done(null, data);
    });
  });
};

passport.use(new FacebookStrategy({
  clientID: '1218514478336787',
  clientSecret: '6d9b0238d7d4ff44ed4669e84a9d2ff6',
  callbackURL: 'http://localhost:1337/facebook/callback',
  passReqToCallback: true,
}, verifyHandler));
