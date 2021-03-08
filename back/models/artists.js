'use strict';
module.exports = (sequelize, DataTypes) => {
  var Artists = sequelize.define('Artists', {
    ArtistName: DataTypes.STRING
  },
  {
    tableName: 'Artist'
  }
  
  
  );

  

  return Artists;
};