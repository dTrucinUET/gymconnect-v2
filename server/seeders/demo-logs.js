'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const logs = [];
        for (let i = 0; i < 10; i++) {
            logs.push({
                event: faker.lorem.sentence(),
                user_id: faker.datatype.number({ min: 1, max: 10 }),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('logs', logs, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('logs', null, {});
    }
};
