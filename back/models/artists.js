'use strict';
module.exports = (sequelize, DataTypes) => {
  var Artists = sequelize.define('Artists', {
    ArtistName: DataTypes.STRING
  },
  {
    tableName: 'Artist'
  }
  );

  Artists.associate = function(models) {
    models.Artists.hasMany(models.Albums,{foreignKey: 'fk_artist'}),
    models.Artists.hasMany(models.Songs,{foreignKey: 'fk_artist'})
  };
/*
  Artists.associate = function(models) {
    models.Artists.hasMany(models.Songs)
  };*/
  //foreignKey: 'fk_artist',
  return Artists;
};