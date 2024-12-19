'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch existing user and room IDs
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users;', 
      { type: Sequelize.QueryTypes.SELECT }
    );

    const rooms = await queryInterface.sequelize.query(
      'SELECT id FROM rooms;', 
      { type: Sequelize.QueryTypes.SELECT }
    );

    const userIds = users.map(user => user.id);
    const roomIds = rooms.map(room => room.id);

    // Generate random user-room associations
    const userRooms = [];
    for (let i = 0; i < 20; i++) {
      userRooms.push({
        user_id: userIds[faker.datatype.number({ min: 0, max: userIds.length - 1 })], // Randomly assign valid user_id
        room_id: roomIds[faker.datatype.number({ min: 0, max: roomIds.length - 1 })], // Randomly assign valid room_id
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert generated records
    await queryInterface.bulkInsert('user_room', userRooms, {});
  },

  async down(queryInterface, Sequelize) {
    // Delete all records from the user_room table
    await queryInterface.bulkDelete('user_room', null, {});
  }
};
