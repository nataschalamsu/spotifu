'use strict';

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  var Mood = sequelize.define('Mood', {
    mood: DataTypes.STRING,
    SongId: DataTypes.INTEGER
  }, {});
  Mood.associate = function(models) {
    // associations can be defined here
    Mood.belongsTo(models.Song)
    // Mood.hasMany(models.Song)
  };

  return Mood;
};
