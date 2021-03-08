'use strict';
module.exports = (sequelize, DataTypes) => {
  var Playlist = sequelize.define('Playlists', {
    PlaylistName: DataTypes.STRING,
    fk_user: DataTypes.INTEGER,
  },
  {
    tableName: 'Playlist'
  }
  );

  

  return Playlist;
};