'use strict';

const Sequelize = require('sequelize')
const Op = Sequelize.Op

const Song = require('./song')

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

  Mood.prototype.getMood = function(param) {

    Mood.findall({
      include: [Song]
    })
    .then(songs => {
      return songs
    })
    .catch(err => {
      return err
    })
  }

  return Mood;
};
