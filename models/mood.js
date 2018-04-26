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

// { where : {mood: {[Op.like]: `%${param}%`}} }

  Mood.getSongsByMood = function(param) {
    return new Promise(function(resolve, reject){
      Mood.findAll({
        include: {
          model: Song
        }
      })
        .then(moods => {
          resolve(moods)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  return Mood;
};
