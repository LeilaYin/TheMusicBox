'use strict';
module.exports = (sequelize, DataTypes) => {
  var Songs = sequelize.define('Songs', {
    SongName: {
      type : DataTypes.STRING,
    },
    Path: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {args: /^(\/[a-zA-Z][a-zA-Z0-9]*)*[a-zA-Z0-9]*\.(mp3){1}$/i,
        msg: "Please enter a valid path for the song"}
        //is: /^(\/{0,1}[a-zA-Z][a-zA-Z0-9]*)*[a-zA-Z0-9]*\.(mp3){1}$/i
      }
    },
    SongReleaseDate: {
      type : DataTypes.DATE,
      validate: {
        isDate: {args:true,
          msg: "Please enter a good release date"}
      }
    },
    fk_album: {
      type : DataTypes.INTEGER,
      validate: {
        isInt: {args:true,
          msg: "Please enter an id (int) of an album"}
      }
    },
    fk_artist: {
      type : DataTypes.INTEGER,
      validate: {
        isInt: {args:true,
          msg: "Please enter an id (int) of an artist"}
        
      }
    }
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
  
  return Songs;
};