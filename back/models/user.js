'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Users', {
    pseudo: {
      type: DataTypes.STRING(100),
      required: true
    },
    pass: {
      type: DataTypes.STRING,
      required: true
    }
  },
  {
    tableName: 'User'
  }
  );
  return User;
};