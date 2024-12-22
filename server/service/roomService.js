const sequelize = require('../config/sequelize.js');
const RoomModel = require('../models/rooms.js')
const { DataTypes } = require('sequelize');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const Sequelize_In = sequelize
const Room = RoomModel(Sequelize_In, DataTypes)

const getAllRoom = async () => {
    let rooms = null;
    try {
        rooms = await Room.findAll({
            attributes: ['id', 'name', 'owner_id', 'description', 'location', 'rating', 'createdAt', 'updatedAt']
        })
    }
    catch (err) {
        console.log("Cannot fetch all rooms");

        throw new Error(err)
    }
    return rooms
}


const getRoomByIdService = async (id) => {

    id = parseInt(id)
    let room = null;
    try {
        room = Room.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'owner_id', 'description', 'location', 'rating', 'createdAt', 'updatedAt']
        })
        return room
    }
    catch {
        console.log("Cannot fetch room by id");
        throw new Error(err)
    }
}

const createRoom = async (room, image) => {

    console.log("newRoom", JSON.parse(room));
    let newRoom = JSON.parse(room);
    console.log(newRoom.name);



    try {
        if (image) {
            const imageBuffer = image.buffer;
            console.log(image);

            await Room.create({
                name: newRoom.name,
                owner_id: newRoom.owner_id,
                description: newRoom.description,
                rating: newRoom.rating,
                image: image.path,
                owner_id: newRoom.owner_id,
                location: JSON.stringify(newRoom.location)
            });
        } else {
            await Room.create({
                name: newRoom.name,
                owner_id: newRoom.owner_id,
                description: newRoom.description,
                rating: newRoom.rating,
                location: JSON.stringify(newRoom.location)

            });
        }

        return "Created room successfully!";
    } catch (err) {
        console.log("Cannot create room", err);
        throw new Error(err);
    }
};


const deleteRoomService = async (id) => {
    try {
        await Room.destroy({
            where: {
                id: id
            }
        })
        return `Room with id:${id} deleted successfully!`
    }
    catch (err) {
        console.log("Cannot delete room by id");
        throw new Error(err)
    }

}
const updateRoomService = async (id, data) => {
    try {
        console.log(id, data);

        console.log('hit edit room services');

        await Room.update(data, {
            where: { id: id }
        })
        return `Room with id: ${id} updated successfully!`
    }
    catch (err) {
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