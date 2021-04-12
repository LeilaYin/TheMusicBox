'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MapPlaylistSong', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_playlist:{
          allowNull: false,
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          references:{
              model:'Playlist',
              key:'id'
          }
      },
      fk_song:{
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references:{
            model:'Song',
            key:'id'
        }
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MapPlaylistSong');
  }
};