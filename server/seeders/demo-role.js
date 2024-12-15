'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const roles = [
            { role_name: 'user' },
            { role_name: 'admin' },
            { role_name: 'manager' },
        ];

        const roleRecords = roles.map(role => ({
            role_name: role.role_name,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert('roles', roleRecords, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {});
    }
};
