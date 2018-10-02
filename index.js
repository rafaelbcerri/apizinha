Track = require("./model/track");
Link = require("./model/link");
Artist = require("./model/artist");

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.use("/dist", express.static(__dirname + '/dist'));

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