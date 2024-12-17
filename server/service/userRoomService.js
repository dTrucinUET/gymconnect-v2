const sequelize = require('../config/sequelize.js');
const UserRoomModel = require('../models/user_room.js')
const UserModel = require('../models/users.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const UserRoom = UserRoomModel(Sequelize_In, DataTypes)
const User = UserModel(Sequelize_In, DataTypes)

const getAllUserRoom = async() => {
    let userRooms = null;
    try{
        userRooms = await UserRoom.findAll()
    }
    catch(err) {
        console.log("Cannot fetch all user_rooms");
        
        throw new Error(err)
    }
    return userRooms
}


const getUserRoomByIdService = async(id) => {
    id = parseInt(id)
    let userRoom = null;
    try{
        userRoom = UserRoom.findOne({
            where: { id: id }
        })
        return userRoom
    }
    catch{
        console.log("Cannot fetch user_room by id");
        throw new Error(err)
    }
}

const createUserRoom = async(userRoom) => {
    const newUserRoom = {
        ...userRoom
    }
    
    try{
        await UserRoom.create({
            ...newUserRoom
        })
        return "Created user_room successfully!"
    }
    catch(err){
        console.log("Cannot create user_room");
        throw new Error(err)
    }
}

const deleteUserRoomService = async(id) => {
    try {
        await UserRoom.destroy({
            where : {
                id : id
            }
        })
        return `User_room with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete user_room by id");
        throw new Error(err)
    }

}
const updateUserRoomService = async(id, data) => {
    try {
        await UserRoom.update(data, {
            where: { id : id}
        })
        return `User Room with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}

const getUserByRoomId = async(roomId) => {
    let userRooms = []
    try {
        userRooms = await UserRoom.findAll({
            where: {
                room_id: roomId
            }
        })
        if(!userRooms) {
            return userRooms
        }

        
        let users = []
        for(let i = 0; i < userRooms.length; i++){
            console.log(userRooms[i].user_id);
            
           const user = await User.findOne({
            where: {
                id: userRooms[i].user_id
            }
           })
           users.push(user)
        }

        return users
        
    }
    catch(err){
        throw new Error(err)
    }
}


module.exports = {
    getAllUserRoom, 
    getUserRoomByIdService,
    createUserRoom,
    updateUserRoomService,
    deleteUserRoomService,
    getUserByRoomId
}