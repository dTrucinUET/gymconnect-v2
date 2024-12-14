'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        uuid: faker.datatype.uuid(),  
        username: faker.internet.userName(), 
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        description: faker.lorem.sentence(),  
        phone_number: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        address: JSON.stringify({ street: faker.address.streetAddress(), city: faker.address.city(), country: faker.address.country() }),  // Giả sử địa chỉ là một JSON
        dob: faker.date.past(30),  
        avatar_url: faker.image.avatar(),
        access_token: faker.datatype.uuid(),  
        refresh_token: faker.datatype.uuid(),  
        location: JSON.stringify({ city: faker.address.city(), country: faker.address.country() }), 
        balance: faker.datatype.float({ min: 0, max: 1000, precision: 0.01 }),  
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('users', users, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});

  }
};
