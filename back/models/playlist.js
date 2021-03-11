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

  Playlist.associate = function(models) {
    //models.Albums.belongsTo(models.Artists,{foreignKey: 'fk_artist'}),
    //models.Playlists.hasMany(models.MapPlaylistSongs,{foreignKey: 'fk_song'})
    models.Playlists.belongsToMany(models.Songs,{foreignKey: 'fk_playlist',through:'MapPlaylistSongs',as:'songs'})
  };

  return Playlist;
};