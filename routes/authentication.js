const passport = require('passport');
const models = require('../models');
const User = models.User;
const LocalStrategy = require('passport-local').Strategy;

passport.use("local-login", new LocalStrategy({ usernameField : 'email' },
  function(email, password, done) {
    User.findAll({ where:{ email } }).then( users => {
      if (users.length === 0) {
        return done(null, false, { message: 'Incorrect email.' });
      } else if (users[0].password === password) {
        return done(null, users[0]);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  })
);

passport.use("local-signup", new LocalStrategy({ usernameField : 'email' },
  function(email, password, done) {
    User.findOne({ where:{ email } }).then( user => {
      if (user) {
        return done(null, false, { message: 'User already exists.' });
      } else {
        User.create({email, password}).then(user => (
          done(null, user)
        ));
      }
    });
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id).then((user) => cb(null, user)).catch(err => cb(err));
});

module.exports.passport = passport;
