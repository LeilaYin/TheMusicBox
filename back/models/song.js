'use strict';
module.exports = (sequelize, DataTypes) => {
  var Songs = sequelize.define('Songs', {
    SongName: DataTypes.STRING,
    Path: DataTypes.STRING,
    SongReleaseDate: DataTypes.DATE,
    fk_album: DataTypes.INTEGER,
    fk_artist: DataTypes.INTEGER
  },
  {
    tableName: 'Song'
  }
  );

  

  return Songs;
};