const User = require('./model/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findAll({ where:{ email: username } }).then( users => {
      if (users.length === 0) {
        return done(null, false, { message: 'Incorrect username.' });
      } else if (users[0].password === password) {
        return done(null, users[0]);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
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
