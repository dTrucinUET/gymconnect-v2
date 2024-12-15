'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const rooms = await queryInterface.sequelize.query(
            'SELECT id FROM rooms;', { type: Sequelize.QueryTypes.SELECT }
        );

        const roomIds = rooms.map(room => room.id);

        const equipments = [];
        for (let i = 0; i < 10; i++) {
            equipments.push({
                name: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
                amount: faker.datatype.number({ min: 1, max: 10 }),
                room_id: roomIds[faker.datatype.number({ min: 0, max: roomIds.length - 1 })], // Randomly select a valid room_id
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert('equipments', equipments, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('equipments', null, {});
    }
};
