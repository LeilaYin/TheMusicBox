'use strict';
module.exports = (sequelize, DataTypes) => {
  var Playlist = sequelize.define('Playlists', {
    PlaylistName: {
      type : DataTypes.STRING,
      validate: {
        isAlphanumeric: {args:true,
        msg: 'Please enter a string for the name of the playlist'}
      }
    },
    fk_user: {
      type : DataTypes.INTEGER,
      validate: {
        isInt: {args:true,
        msg: 'Please enter the User ID, must be an int'}
      }
    },
  },
  {
    tableName: 'Playlist'
  }
  );

  Playlist.associate = function(models) {
    models.Playlists.belongsTo(models.Users,{foreignKey: 'fk_user',as:'createdBy'}),
    //models.Playlists.hasMany(models.MapPlaylistSongs,{foreignKey: 'fk_song'})
    models.Playlists.belongsToMany(models.Songs,{foreignKey: 'fk_playlist',through:'MapPlaylistSongs',as:'songs'})
  };

  return Playlist;
};