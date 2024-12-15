'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transactionLogs = [];
        for (let i = 0; i < 10; i++) {
            transactionLogs.push({
                event: faker.lorem.sentence(),
                transaction_id: faker.datatype.number({ min: 1, max: 10 }),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('transactionlogs', transactionLogs, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('transactionlogs', null, {});
    }
};
