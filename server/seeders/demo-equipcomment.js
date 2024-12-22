'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Fetch existing equipment IDs
        const equipments = await queryInterface.sequelize.query(
            'SELECT id FROM equipments;', { type: Sequelize.QueryTypes.SELECT }
        );
        const users = await queryInterface.sequelize.query(
            'SELECT id FROM users;', { type: Sequelize.QueryTypes.SELECT }
        );
        const userIds = users.map(user => user.id);
        const equipmentIds = equipments.map(equipment => equipment.id);

        const equipmentComments = [];
        for (let i = 0; i < 10; i++) {
            equipmentComments.push({
                comment: faker.lorem.sentence(),
                user_id: userIds[faker.datatype.number({ min: 0, max: userIds.length - 1 })],
                images_url: JSON.stringify([faker.image.imageUrl(), faker.image.imageUrl()]), // Example for storing image URLs in JSON format
                rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
                equipment_id: equipmentIds[faker.datatype.number({ min: 0, max: equipmentIds.length - 1 })], // Randomly assign valid equipment_id
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert('equipment_comments', equipmentComments, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('equipment_comments', null, {});
    }
};
