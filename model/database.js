const Sequelize = require('sequelize');

const database = new Sequelize(
  process.env.CLEARDB_DATABASE_URL
);

database
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = database;
