'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const roomComments = [];
        for (let i = 0; i < 10; i++) {
            roomComments.push({
                comment: faker.lorem.sentence(),
                images_url: JSON.stringify([faker.image.imageUrl(), faker.image.imageUrl()]),
                rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
                room_id: faker.datatype.number({ min: 1, max: 10 }),
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
