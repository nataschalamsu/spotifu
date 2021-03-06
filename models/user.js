'use strict';

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    email: {
      type: DataTypes.STRING,
      validate : {
        isEmail: {
          args: true,
          msg: `Error input must be email format`
        }
      }
    },
    password: DataTypes.STRING
  }, {hooks: {
    beforeCreate: (user, options) => {
      let hash = bcrypt.hashSync(user.password, 10);
      user.password = hash
    },
  }});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Song, {through: models.UserSong})
    User.hasMany(models.UserSong)
  };
  return User;
};
