'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const services = [];
        for (let i = 0; i < 10; i++) {
            services.push({
                name: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
                balance: faker.datatype.float({ min: 100, max: 1000, precision: 0.01 }),
                days: faker.datatype.float({ min: 100, max: 1000, precision: 0.01 }),
                amount: faker.datatype.number({ min: 1, max: 10 }),
                type: faker.random.arrayElement(['card', 'trainer', 'exercise']),
                room_id: faker.datatype.number({ min: 1, max: 10 }),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('services', services, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('services', null, {});
    }
};
