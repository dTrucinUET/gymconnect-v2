const sequelize = require('../config/sequelize.js');
const RoomModel = require('../models/rooms.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const Room = RoomModel(Sequelize_In, DataTypes)

const getAllRoom = async() => {
    let rooms = null;
    try{
        rooms = await Room.findAll({
            attributes: ['id', 'name', 'owner_id', 'description', 'location', 'rating', 'createdAt', 'updatedAt']
        })
    }
    catch(err) {
        console.log("Cannot fetch all rooms");
        
        throw new Error(err)
    }
    return rooms
}


const getRoomByIdService = async(id) => {
    id = parseInt(id)
    let room = null;
    try{
        room = Room.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'owner_id', 'description', 'location', 'rating', 'createdAt', 'updatedAt']
        })
        return room
    }
    catch{
        console.log("Cannot fetch room by id");
        throw new Error(err)
    }
}

const createRoom = async(room) => {
    const newRoom = {
        ...room
    }
    
    try{
        await Room.create({
            ...newRoom,
            owner_id: newRoom.owner_id
        })
        return "Created room successfully!"
    }
    catch(err){
        console.log("Cannot create room");
        throw new Error(err)
    }
}

const deleteRoomService = async(id) => {
    try {
        await Room.destroy({
            where : {
                id : id
            }
        })
        return `Room with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete room by id");
        throw new Error(err)
    }

}
const updateRoomService = async(id, data) => {
    try {
        await Room.update(data, {
            where: { id : id}
        })
        return `Room with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}



module.exports = {
    getAllRoom, 
    getRoomByIdService,
    createRoom,
    updateRoomService,
    deleteRoomService
}