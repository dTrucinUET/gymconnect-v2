'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('services', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      room_id: { 
        type: Sequelize.INTEGER, 
        references: { model: 'rooms', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      rating: { type: Sequelize.FLOAT, allowNull: true },
      balance: { type: Sequelize.FLOAT, allowNull: false },
      amount: { type: Sequelize.INTEGER, allowNull: false },
      type: { 
        type: Sequelize.ENUM('card', 'trainer', 'exercise'), 
        allowNull: false 
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('services');
  },
};
