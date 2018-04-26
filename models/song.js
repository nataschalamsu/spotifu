'use strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op

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

  Song.getSongsByTitle = function(param) {
    
    return new Promise(function(resolve, reject){
      Song.findAll({
        where : {
          title_song: {
            [Op.like]: `%${param}%`
          }
        }
      })
        .then(songs => {
          resolve(songs)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  Song.getSongsBySinger = function(param) {

    return new Promise(function(resolve, reject){
      Song.findAll({
        where: {
          singer: {
            [Op.like] : `%${param}%`
          }
        }
      })
      .then(SongsBySinger => {
        resolve(SongsBySinger)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  Song.getSongsByGenre = function(param) {

    return new Promise(function(resolve, reject){
      Song.findAll({
        where: {
          genre: {
            [Op.like] : `%${param}%`
          }
        }
      })
      .then(SongsByGenre => {
        resolve(SongsByGenre)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  return Song;
};
