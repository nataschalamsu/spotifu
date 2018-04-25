'use strict';
module.exports = (sequelize, DataTypes) => {
  var Song = sequelize.define('Song', {
    title_song: DataTypes.STRING,
    singer: DataTypes.STRING,
    genre: DataTypes.STRING,
    song_link: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.hasMany(models.Mood)
    Song.belongsToMany(models.User, {through: models.UserSong})
    Song.hasMany(models.UserSong)
  };
  return Song;
};
