const Sequelize = require('sequelize');

const database = new Sequelize('laboratoria', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  // SQLite only
  storage: './laboratoria.sqlite'
});

database
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = database;
