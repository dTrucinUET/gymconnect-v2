const bcrypt = require('bcryptjs');
const UserModel = require('../models/users')
const RoleModel = require('../models/roles')
const PermissionModel = require('../models/permissions')
const RolePermissionModel = require('../models/role_permission')
const sequelize = require('../config/sequelize.js');
const { DataTypes, where } = require('sequelize');

const Sequelize_In = sequelize
const User = UserModel(Sequelize_In, DataTypes)
const Role = RoleModel(Sequelize_In, DataTypes)
const Permission = PermissionModel(Sequelize_In, DataTypes)
const RolePermission = RolePermissionModel(Sequelize_In, DataTypes)

const salt = bcrypt.genSaltSync(10);

const hashUserPassWord = (userPassWord) => {
    const hashPassWord = bcrypt.hashSync(userPassWord, salt);
    return hashPassWord;
}

const createNewUser = async (email, password, username) => {
    let hashpass = hashUserPassWord(password);

    try {
        await User.create({
            email: email,
            password: hashpass,
            username: username
        })
    } catch (err) {
        throw Error(err)
    }

}


const getUserList = async () => {
    try {
        // Lấy tất cả users
        const users = await User.findAll();
        let userList = []
        for (let user of users) {
            const role1 = user;
            console.log("user in loop", user.dataValues)
            // console.log("role user", role1.dataValues.role_id);
            // let role_id = role1.dataValues.role_id

            let role_id = 1
            switch (role1.dataValues.role_name) {
                case 'admin':
                    role_id = 2;
                    break;
                case 'manager':
                    role_id = 3;

                    break;
                case 'user':
                    role_id = 1;

                    break;
                default:
                    role_id = 1;
            }
            const permission_role = await RolePermission.findAll({
                where: {
                    role_id: role_id
                },
                raw: true
            });

            console.log('permission_role', permission_role);

            let permission_list = [];

            for (let item of permission_role) {
                console.log("item.permission_id", item.permission_id);

                const permission = await Permission.findOne({
                    where: {
                        id: item.permission_id
                    },
                    attributes: ['permission'],
                    raw: true
                });

                if (permission && !permission_list.some(p => p.permission === permission.permission)) {
                    permission_list.push(permission);
                }
            }

            console.log(permission_list);
            userList.push({
                ...user.dataValues,
                permission_list: permission_list

            })
        }


        console.log(userList);

        return userList;
    } catch (err) {
        console.error('Error fetching users with permissions:', err);
        throw new Error('Failed to fetch users with permissions');
    }
};


const deleteUserService = async (userIndex) => {

    try {
        await User.destroy({
            where: { id: userIndex }
        });
        return "Delete user successfully!"

    } catch (err) {
        throw Error(err)

    }

}
const getUserByIdService = async (userIndex) => {
    let user = {}
    try {
        user = await User.findOne({ where: { id: userIndex } });
        return user.get({ plain: true });
    } catch (err) {
        throw Error(err)
    }

}
const updateUserInfor = async (userIndex, data) => {
    try {
        await User.update({
            ...data
        },
            {
                where: {
                    id: userIndex,
                },
            },
        );

    } catch (err) {
        throw Error(err)
    }

}
module.exports = {
    createNewUser,
    getUserList,
    deleteUserService,
    getUserByIdService,
    updateUserInfor
}