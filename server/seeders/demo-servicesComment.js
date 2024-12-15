'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const serviceComments = [];
        for (let i = 0; i < 10; i++) {
            serviceComments.push({
                comment: faker.lorem.sentence(),
                images_url: JSON.stringify([faker.image.imageUrl(), faker.image.imageUrl()]),
                rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
                service_id: faker.datatype.number({ min: 1, max: 10 }),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('service_comments', serviceComments, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('service_comments', null, {});
    }
};
