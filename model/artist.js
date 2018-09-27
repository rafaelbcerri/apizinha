const Sequelize = require('sequelize');
const database = require('./database');
const Link = require('./link');

const Artist = database.define('artist', {
  name: {
    type: Sequelize.STRING
  },
  genre: {
    type: Sequelize.STRING
  }
});

Artist.hasMany(Link);

module.exports = Artist;