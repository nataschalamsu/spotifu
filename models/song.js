'use strict';
module.exports = (sequelize, DataTypes) => {
  var Song = sequelize.define('Song', {
    title_song: DataTypes.STRING,
    singer: DataTypes.STRING,
    genre: DataTypes.STRING,
    song_link: DataTypes.STRING,
    MoodId: DataTypes.INTEGER
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
  };
  return Song;
};