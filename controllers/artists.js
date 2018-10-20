const router = require('express').Router();
const models = require('../models');
const Artist = models.Artist;
const Track = models.Track;

router.get('/artists', function (req, res) {
  Artist
    .findAll()
    .then( list => {
      const artistList = list.map(item => item.dataValues);
      res.send(artistList);
    });
});

router.post("/artists", function (req, res) {
  Artist
    .create(req.body)
    .then( artist => res.status(201).send(artist) );
});

router.get('/artists/:id', function (req, res) {
  Artist
    .findById(req.params.id)
    .then( artist => {
      artist ? res.send(artist.dataValues) : res.sendStatus(404)
    });
});

router.put("/artists/:id", function (req, res) {
  Artist
    .update({...req.body}, {where: { id: req.params.id}})
    .then(() => {
      Artist
        .findById(req.params.id)
        .then(artist => res.send(artist.dataValues))
    });
    
});

router.delete("/artists/:id", function (req, res) {
  Artist
    .destroy({where: { id: req.params.id}})
    .then(() => res.sendStatus(200))
});

router.get('/artists/:artistId/tracks', function (req, res) {
  Artist
    .findById(req.params.artistId)
    .then( artist => {
      return artist ? artist.getTracks() : res.sendStatus(404)
    })
    .then( list => {
      const tracksList = list.map(item => item.dataValues);
      res.send(tracksList);
    });
});

router.post('/artists/:artistId/tracks/:trackId', function (req, res) {
  Artist
    .findById(req.params.artistId)
    .then( artist => {
      Track
        .findById(req.params.trackId)
        .then( track => artist.addTracks(track) )
        .then( artistTrack => res.status(201).send(artistTrack) )
    });
});

router.delete('/artists/:artistId/tracks/:trackId', function (req, res) {
  Artist
    .findById(req.params.artistId)
    .then( artist => {
      Track
        .findById(req.params.trackId)
        .then( track => artist.removeTracks(track) )
        .then( () => res.sendStatus(200) )
    });
});


module.exports = router;