'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserSong = sequelize.define('UserSong', {
    UserId: DataTypes.INTEGER,
    SongId: DataTypes.INTEGER
  }, {});
  UserSong.associate = function(models) {
    // associations can be defined here
    UserSong.belongsTo(models.Song)
    UserSong.belongsTo(models.User)
  };
  return UserSong;
};
