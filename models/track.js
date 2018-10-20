'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  Track.associate = function(models) {
    // associations can be defined here
  };
  return Track;
};