'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transactions = [];
        for (let i = 0; i < 10; i++) {
            transactions.push({
                status: faker.random.arrayElement(['pending', 'failed', 'completed']),
                user_id: faker.datatype.number({ min: 1, max: 10 }),
                service_id: faker.datatype.number({ min: 1, max: 10 }),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('transactions', transactions, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('transactions', null, {});
    }
};
