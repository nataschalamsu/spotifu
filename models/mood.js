'use strict';
module.exports = (sequelize, DataTypes) => {
  var Mood = sequelize.define('Mood', {
    mood: DataTypes.STRING,
    SongId: DataTypes.INTEGER
  }, {});
  Mood.associate = function(models) {
    // associations can be defined here
  };
  return Mood;
};