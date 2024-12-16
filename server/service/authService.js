const bcrypt = require('bcryptjs');
const UserModel = require('../models/users')
const sequelize = require('../config/sequelize.js');
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const User = UserModel(Sequelize_In, DataTypes)

const salt = bcrypt.genSaltSync(10);

const registerService = async(register_data) => {
    const user_email = register_data.email
    const user_phone = register_data.phone_number
    let message = null
    const phoneValidatedUser = User.findOne({
        where: {
            phone_number: user_phone
        }
    })

    const emailValidatedUser = User.findOne({
        where: {
            email: user_email
        }
    })

    if(phoneValidatedUser){
        message = 'Phone number already exists'
        return message
    }
    if(emailValidatedUser){
        message = 'Email already exists'
        return message
    }
    try {
        const hash_password = await bcrypt.hash(register_data.password, salt)
        register_data.password = hash_password
        await User.create({
            ...register_data
        })
        return 'Create new user successfully!'
    }
    catch(err){
        throw Error(err)
    }
    

}

module.exports = {
    registerService
}