import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import db from '../models/index'

const getUserById = async (userIndex) => {
    let user = {}
    try {
        user = await db.User.findOne({

            where: { id: userIndex },
            attributes: ["id", "username", "phone", "sex", "address"],
            include: {
                model: db.Group,
                attributes: ["id", "name", "description"],
            },
            raw: true,
            nest: true
        });

        if (user) {
            // console.log("check get user", user);

            return {
                EM: 'get user succesfully',
                EC: '0',
                DT: user
            }
        }
        else {
            return {
                EM: 'User not found',
                EC: '1',
                DT: ''
            }
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        return {
            EM: 'something wrong in server',
            EC: '2',
            DT: ''
        }
    }
}
