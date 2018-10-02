const Sequelize = require('sequelize');
const database = require('./database');
const Track = require('./track');
const User = require('./user');

const TrackRequest = database.define('track_request', {
  timestamp: {
    type: Sequelize.STRING, allowNull: false,
  },
});

TrackRequest.belongsTo(Track);
Track.hasMany(TrackRequest);
TrackRequest.belongsTo(User);
User.hasMany(TrackRequest);
TrackRequest.belongsTo(Jukebox);
Jukebox.hasMany(TrackRequest);

module.exports = TrackRequest;