'use strict';
module.exports = (sequelize, DataTypes) => {
  var Artists = sequelize.define('Artists', {
    ArtistName: {
      type : DataTypes.STRING,
      validate : {
          isAlphanumeric: {args:true,
          msg: 'Please enter a string name for create an artist'}
      }
    }
  },
  {
    tableName: 'Artist'
  }
  );

  Artists.associate = function(models) {
    models.Artists.hasMany(models.Albums,{foreignKey: 'fk_artist'}),
    models.Artists.hasMany(models.Songs,{foreignKey: 'fk_artist'})
  };
  
  return Artists;
};