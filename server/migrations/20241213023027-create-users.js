'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: Sequelize.STRING, unique: true, allowNull: false },
      first_name: { type: Sequelize.STRING, allowNull: false },
      last_name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: true },
      phone_number: { type: Sequelize.STRING, allowNull: true },
      email: { type: Sequelize.STRING, unique: true, allowNull: false },
      address: { type: Sequelize.JSON, allowNull: true },
      dob: { type: Sequelize.DATE, allowNull: true },
      avatar_url: { type: Sequelize.STRING, allowNull: true },
      location: { type: Sequelize.JSON, allowNull: false },
      balance: { type: Sequelize.FLOAT, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      sex: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
