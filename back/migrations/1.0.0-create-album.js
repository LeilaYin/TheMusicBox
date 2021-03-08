'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Album', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AlbumName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      AlbumReleaseDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fk_artist:{
          allowNull: false,
          type: Sequelize.INTEGER,
          references:{
              model:'Artist',
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
    return queryInterface.dropTable('Album');
  }
};