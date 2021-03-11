'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Users', {
    pseudo: {
      type : DataTypes.STRING,
      required: true,
      validate : {
        isAlphanumeric: {args:true,
        msg: 'Please enter a string name for create an artist'}
      }
    },
    pass: {
      type : DataTypes.STRING,
      required: true,
      validate : {
        isAlphanumeric: {args:true,
        msg: 'Please enter a string name for create an artist'}
      }
    },
  },
  {
    tableName: 'User'
  }
  );

  User.associate = function(models) {
    models.Users.hasMany(models.Playlists,{foreignKey: 'fk_user'})
  };

  return User;
};