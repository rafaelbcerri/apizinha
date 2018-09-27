const Sequelize = require('sequelize');
const database = require('./database');

const Track = database.define('track', {
  title: {
    type: Sequelize.STRING
  },
  artist: {
    type: Sequelize.STRING
  }
});

module.exports = Track;