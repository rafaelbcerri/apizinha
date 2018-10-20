const router = require('express').Router();
const passport = require('../routes/authentication').passport;
const models = require('../models');
const User = models.User;

router.post('/login',
  passport.authenticate('local-login', {failureRedirect: '/unauthorized'}),
  function(req, res) {
    res.send(req.user);
});

router.post('/signup',
  passport.authenticate('local-signup' , {failureRedirect: '/conflict'}),
  function(req, res) {
    res.send(req.user);
});

router.get('/users/:id', function (req, res) {
  User
    .findById(req.params.id)
    .then( user => {
      user ? res.send(user.dataValues) : res.sendStatus(404)
    });
});

module.exports = router;