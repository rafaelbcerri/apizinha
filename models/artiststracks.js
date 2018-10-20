'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArtistsTracks = sequelize.define('ArtistsTracks', {
    artistId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER
  }, {});
  ArtistsTracks.associate = function(models) {
    models.Artist.belongsToMany(models.Track, { through: ArtistsTracks, foreignKey: 'artistId' });
    models.Track.belongsToMany(models.Artist, { through: ArtistsTracks, foreignKey: 'trackId' });
    // associations can be defined here
  };
  return ArtistsTracks;
};
