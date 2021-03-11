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

  MapPlaylistSongs.associate = function(models) {
    models.MapPlaylistSongs.belongsTo(models.Playlists,{foreignKey: 'fk_playlist'}),
    models.MapPlaylistSongs.belongsTo(models.Songs,{foreignKey: 'fk_song'})
    //models.Playlist.hasMany(models.Songs,{foreignKey: 'fk_song',throught:'MapPlaylistSongs'})
  };

  return MapPlaylistSongs;
};