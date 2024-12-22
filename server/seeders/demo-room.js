'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const rooms = [];
        for (let i = 0; i < 10; i++) {
            rooms.push({
                name: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                location: JSON.stringify({ city: faker.address.city(), country: faker.address.country() }),
                image:  faker.commerce.productName(),
                rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
                owner_id: faker.datatype.number({ min: 1, max: 10 }),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('rooms', rooms, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('rooms', null, {});
    }
};
