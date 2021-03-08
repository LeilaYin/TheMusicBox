'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Users', {
    pseudo: DataTypes.STRING,
    pass: DataTypes.STRING,
  },
  {
    tableName: 'User'
  }
  );

  

  return User;
};