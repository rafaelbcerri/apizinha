const Sequelize = require('sequelize');
const database = require('./database');

const User = database.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING, allowNull: false,
    validate: { isEmail: true }
  },
  password: {
    type: Sequelize.STRING, allowNull: false
  },
  token: {
    type: Sequelize.STRING
  }
});

module.exports = User;