'use strict';
module.exports = (sequelize, DataTypes) => {
  var Albums = sequelize.define('Albums', {
    AlbumName: DataTypes.STRING,
    fk_artist: DataTypes.INTEGER,
    AlbumReleaseDate: DataTypes.DATE
  },
  {
    tableName: 'Album'
  }
  );

  

  return Albums;
};