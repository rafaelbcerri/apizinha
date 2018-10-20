const router = require('express').Router();
const models = require('../models');
const Track = models.Track;

router.get('/tracks', function (req, res) {
  Track
    .findAll()
    .then( list => {
      const trackList = list.map(item => item.dataValues);
      res.send(trackList);
    });
});

router.post("/tracks", function (req, res) {
  Track
    .create(req.body)
    .then( track => res.status(201).send(track) );
});

router.get('/tracks/:id', function (req, res) {
  Track
    .findById(req.params.id)
    .then( track => {
      track ? res.send(track.dataValues) : res.sendStatus(404)
    });
});

router.put("/tracks/:id", function (req, res) {
  Track
    .update({...req.body}, {where: { id: req.params.id}})
    .then(() => {
      Track
        .findById(req.params.id)
        .then(track => res.send(track.dataValues))
    });
    
});

router.delete("/tracks/:id", function (req, res) {
  Track
    .destroy({where: { id: req.params.id}})
    .then(() => res.sendStatus(200))
});

module.exports = router;