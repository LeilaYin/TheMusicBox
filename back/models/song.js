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

  Songs.associate = function(models) {
    models.Songs.belongsTo(models.Albums,{foreignKey: 'fk_album'}),
    models.Songs.belongsTo(models.Artists,{foreignKey: 'fk_artist'}),
    models.Songs.belongsToMany(models.Playlists,{foreignKey: 'fk_song',through:'MapPlaylistSongs'})
  };

  /*Songs.associate = function(models) {
    models.Songs.belongsTo(models.Artists,{foreignKey: 'fk_artist'})
    
  };*/
  

  return Songs;
};