'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rating_services', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      room_id: { 
        type: Sequelize.INTEGER, 
        references: { model: 'rooms', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      comment: { type: Sequelize.TEXT, allowNull: true },
      images_url: { type: Sequelize.JSON, allowNull: true },
      rating: { type: Sequelize.FLOAT, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('rating_services');
  },
};

