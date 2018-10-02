//Models
Track = require("./model/track");
Link = require("./model/link");
Artist = require("./model/artist");
Jukebox = require('./model/jukebox');
User = require('./model/user');
TrackRequest = require('./model/track_request');

//Authentication
const express = require('express');
var passport = require('./authentication').passport;

//Node Express App
const path = require('path');
const port = process.env.PORT || 8080;

const app = express();

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/dist", express.static(__dirname + '/dist'));

app.use(function (req, res, next) {
  if (req.user === undefined || req.path === "/login") {
    return res.sendStatus(401);
  }else {
    next();
  }
});

app.post('/login',
  passport.authenticate('local', {failureRedirect: '/unauthorized'}),
  function(req, res) {
    res.send(req.user);
});

app.get("/", function(req, resp) {
  resp.send("Hello");
});

app.get("/unauthorized", function(req, resp) {
  resp.sendStatus(401);
});

app.get('/artists', function (request, response) {
  Artist.findAll().then( list => {
    response.send(
      list.map(item => item.dataValues)
    );
  });
});

app.post("/artists", function (request, response) {
  console.log(request.body);
  Artist.create(request.body).then(artist =>
    response.status(201).send(artist)
  );
});


app.get('/artists/:id', function (request, response) {
  Artist.findById(request.params.id).then( artist => {
    if (artist === null) {
      response.sendStatus(404);
    } else {
      response.send(artist.dataValues);
    }
  });
});

app.get('/artists/:id/links', function (request, response) {
  Link.findAll({where: {artistId: request.params.id}}).then( links => {
    response.send(
      links.map(item => item.dataValues)
    );
  });
});

app.get('/tracks', function (request, response) {
  response.sendStatus(404);
});

app.get('/tracks/:id', function (request, response) {
  response.sendStatus(404);
});

app.listen(port);
console.log("server started on port " + port);