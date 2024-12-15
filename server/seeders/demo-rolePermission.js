'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Fetch existing role IDs
        const roles = await queryInterface.sequelize.query(
            'SELECT id FROM roles;', { type: Sequelize.QueryTypes.SELECT }
        );

        const roleIds = roles.map(role => role.id);

        const rolePermissions = [];
        for (let i = 0; i < 10; i++) {
            rolePermissions.push({
                role_id: roleIds[faker.datatype.number({ min: 0, max: roleIds.length - 1 })], // Randomly assign valid role_id
                permission_id: faker.datatype.number({ min: 1, max: 5 }), // Example for generating permission_id
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert('role_permission', rolePermissions, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('role_permission', null, {});
    }
};
