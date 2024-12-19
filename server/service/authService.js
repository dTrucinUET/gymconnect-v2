const bcrypt = require('bcryptjs');

const UserModel = require('../models/users')

const sequelize = require('../config/sequelize.js');
const { DataTypes } = require('sequelize');
const { createJWT } = require('../middleware/jwtAction.js');

const Sequelize_In = sequelize
const User = UserModel(Sequelize_In, DataTypes)

const salt = bcrypt.genSaltSync(10);

const hashUserPassWord = (userPassWord) => {
    const hashPassWord = bcrypt.hashSync(userPassWord, salt);
    return hashPassWord;
}

const registerService = async(register_data) => {
    const user_email = register_data.email
    const user_phone = register_data.phone_number
    let message = null
    const phoneValidatedUser = await User.findOne({
        where: {
            phone_number: user_phone
        }
    })

    const emailValidatedUser = await User.findOne({
        where: {
            email: user_email
        }
    })

    if(phoneValidatedUser){
        message = 'Error: Phone number already exists'
        return message
    }
    if(emailValidatedUser){
        message = 'Error: Email already exists'
        return message
    }
    try {
        const hash_password = hashUserPassWord(register_data.password)
        register_data.password = hash_password
        console.log(register_data);
        
        await User.create({
            ...register_data
        })
        return 'Create new user successfully!'
    }
    catch(err){
        throw Error(err)
    }
}

const loginService = async(username, password) => {
    const validated_username = username.trim()
    let message = ''
    let token = null
    try{
        const validatedUser = await User.findOne({
            where: {
                username: validated_username
            }
        })


        if(!validatedUser){
            message = 'Error: Username not found'
            return {message: message, token: token}
        }

        const isValidPassword = await bcrypt.compare(password, validatedUser.password)

        if(!isValidPassword){
            message = 'Error: Password is incorrect'
            return {message: message, token: token}
        }

        const token_data = {
            username : validatedUser.username,
            email : validatedUser.email,
            first_name: validatedUser.first_name,
            last_name: validatedUser.last_name,
            id : validatedUser.id,
            role_name: validatedUser.role_name
        }

        const received_token = createJWT(token_data)
        if(!received_token) {
            message = 'Error: Failed to create token'
            return {message: message, token: token}
        }
        token = received_token
        message = 'Login successful'
        return {message: message, token: token, user_data : token_data}

    }
    catch(err){
        throw Error(err)
    }
}

const logoutService = () => {
    const message = "User logout successfully!"
    return message
}

module.exports = {
    registerService,
    hashUserPassWord,
    loginService,
    logoutService
}