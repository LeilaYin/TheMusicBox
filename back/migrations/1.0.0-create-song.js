'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Song', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SongName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Path: {
        allowNull: false,
        type: Sequelize.STRING
      },
      SongReleaseDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fk_album:{
          allowNull: false,
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          references:{
              model:'Album',
              key:'id'
          }
      },
      fk_artist:{
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
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
    return queryInterface.dropTable('Song');
  }
};