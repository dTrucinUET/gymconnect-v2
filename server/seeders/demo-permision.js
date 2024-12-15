'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const permissions = [
            'xem',
            'quản lý phòng gym',
            'thêm mới phòng gym',
            'chỉnh sửa phòng gym',
            'xoá phòng gym',
            'quản lý tài khoản',
            'thêm mới người dùng',
            'xoá người dùng',
            'chỉnh sửa người dùng',
            'quản lý role',
            'thêm role',
            'sửa role',
            'xoá role',
        ];

        const permissionRecords = permissions.map(permission => ({
            permission,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert('permissions', permissionRecords, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('permissions', null, {});
    }
};
