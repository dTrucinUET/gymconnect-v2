'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const roomComments = [];
        const users = await queryInterface.sequelize.query(
            'SELECT id FROM users;', { type: Sequelize.QueryTypes.SELECT }
        );
        const rooms = await queryInterface.sequelize.query(
            'SELECT id FROM rooms;', { type: Sequelize.QueryTypes.SELECT }
        );
        const userIds = users.map(user => user.id);
        const roomIds = rooms.map(room => room.id);
        for (let i = 0; i < 10; i++) {
            roomComments.push({
                comment: faker.lorem.sentence(),
                user_id: userIds[faker.datatype.number({ min: 0, max: userIds.length - 1 })],
                images_url: JSON.stringify([faker.image.imageUrl(), faker.image.imageUrl()]),
                rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
                room_id: roomIds[faker.datatype.number({ min: 0, max: roomIds.length - 1 })],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('room_comments', roomComments, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('room_comments', null, {});
    }
};
