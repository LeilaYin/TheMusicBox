'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Users', {
    pseudo: {
      type : DataTypes.STRING,
      required: true,
    },
    pass: {
      type : DataTypes.STRING,
      required: true,
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