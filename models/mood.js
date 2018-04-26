'use strict';

const Sequelize = require('sequelize')
// const Op = Sequelize.Op

// const Song = require('./song')
// console.log(Song)

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

  // Mood.prototype.getMood = function(param) {

  //   Mood.findall({
  //     include: [Song]
  //   })
  //   .then(songs => {
  //     return songs
  //   })
  //   .catch(err => {
  //     return err
  //   })
  // }
  // Mood.getMood = function(param) {

  //   return new Promise(function(resolve, reject){
  //     Mood.findAll({
  //       include: [Song],
  //       where: {
  //         mood: {
  //           [Op.like]: `%${param}%`
  //         }
  //       }
  //     })
  //     .then(songs => {
  //       resolve(songs)
  //     })
  //     .catch(err => {
  //       reject(err)
  //     })
  //   })
  // }

  // Song.getSongsByTitle = function(param) {

  //   return new Promise(function(resolve, reject){
  //     Song.findAll({
  //       where : {
  //         title_song: {
  //           [Op.like]: `%${param}%`
  //         }
  //       }
  //     })
  //       .then(songs => {
  //         resolve(songs)
  //       })
  //       .catch(err => {
  //         reject(err)
  //       })
  //   })
  // }

  return Mood;
};
