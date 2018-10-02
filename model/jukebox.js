const Sequelize = require('sequelize');
const database = require('./database');

const Jukebox = database.define('jukebox', {
  name: {
    type: Sequelize.STRING, allowNull: false
  },
  city: {
    type: Sequelize.STRING, allowNull: false, length: 200
  },
  state: {
    type: Sequelize.STRING, allowNull: false, length: 2
  },
  country: {
    type: Sequelize.STRING, allowNull: false, length: 2
  },
  lat: {
    type: Sequelize.DECIMAL(9, 6)
  },
  long: {
    type: Sequelize.DECIMAL(9, 6)
  }
});

module.exports = Jukebox;