'use strict';
module.exports = (sequelize, DataTypes) => {
  var MapPlaylistSongs = sequelize.define('MapPlaylistSongs', {
    fk_playlist: DataTypes.INTEGER,
    fk_song: DataTypes.INTEGER,
  },
  {
    tableName: 'MapPlaylistSong'
  }
  );

  

  return MapPlaylistSongs;
};