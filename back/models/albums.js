'use strict';
module.exports = (sequelize, DataTypes) => {
  var Albums = sequelize.define('Albums', {
    AlbumName: {
      type : DataTypes.STRING,
      validate: {
        isAlphanumeric: {args:true,
        msg: 'Please enter a string album name'}
      }
    },
    fk_artist: {
      type: DataTypes.INTEGER,
      references:{
        model : 'Artists',
        key: 'id'
      },
      validate: {
        isInt: {args:true,
        msg: 'Please enter the Artist ID (int)'}
      }
    },
    AlbumReleaseDate: {
      type : DataTypes.DATE,
      validate: {
        isDate: {args:true,
        msg: 'Please enter a correct date'}
      }
    }
  },
  {
    tableName: 'Album'
  }
  );

  Albums.associate = function(models) {
    models.Albums.belongsTo(models.Artists,{foreignKey: 'fk_artist'}),
    models.Albums.hasMany(models.Songs,{foreignKey: 'fk_album'})
  };

  return Albums;
};