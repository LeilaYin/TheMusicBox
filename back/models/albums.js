'use strict';
module.exports = (sequelize, DataTypes) => {
  var Albums = sequelize.define('Albums', {
    AlbumName: DataTypes.STRING,
    fk_artist: {
      type: DataTypes.INTEGER,
      references:{
        model : 'Artists',
        key: 'id'
      }
    },
    AlbumReleaseDate: DataTypes.DATE
  },
  {
    tableName: 'Album'
  }
  );

  Albums.associate = function(models) {
    models.Albums.belongsTo(models.Artists,{foreignKey: 'fk_artist'}),
    models.Albums.hasMany(models.Songs,{foreignKey: 'fk_album'})
  };

  /*Albums.associate = function(models) {
    models.Albums.hasMany(models.Songs)
  };*/

  //,{foreignKey: 'fk_artist'}


  return Albums;
};