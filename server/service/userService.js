import bcrypt from 'bcryptjs';
import db from '../models/index'


const salt = bcrypt.genSaltSync(10);

const hashUserPassWord = (userPassWord) => {
    const hashPassWord = bcrypt.hashSync(userPassWord, salt);
    return hashPassWord;
}

const createNewUser = async (email, password, username) => {
    let hashpass = hashUserPassWord(password);

    try {
        await db.User.create({
            email: email,
            password: hashpass,
            username: username
        })
    } catch (err) {
        throw Error(err)
    }

}

const getUserList = async () => {

    let user = []
    try {
        user = await db.User.findAll()
        return user;
    } catch (err) {
        throw Error(err)
    }
}

const deleteUserService = async (userIndex) => {

    try {
        await db.User.destroy({
            where: { id: userIndex }
        });
    } catch (err) {
        throw Error(err)

    }

}
const getUserByIdService = async (userIndex) => {
    let user = {}
    try {
        user = await db.User.findOne({ where: { id: userIndex } });
        return user.get({ plain: true });
    } catch (err) {
        throw Error(err)
    }

}
const updateUserInfor = async (userIndex, data) => {
    try {
        await db.User.update({
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