const Sequelize = require('sequelize');
const database = require('./database');

const User = database.define('user', {
  name: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  }
});

module.exports = User;