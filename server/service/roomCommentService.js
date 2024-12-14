const sequelize = require('../config/sequelize.js');
const RoomCommentModel = require('../models/room_comments.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const RoomComment = RoomCommentModel(Sequelize_In, DataTypes)

const getAllRoomComment = async() => {
    let roomComments = null;
    try{
        roomComments = await RoomComment.findAll({
            attributes: ['id', 'room_id', 'comment', 'images_url', 'rating', 'createdAt', 'updatedAt']
        })
    }
    catch(err) {
        console.log("Cannot fetch all room comments");
        
        throw new Error(err)
    }
    return roomComments
}


const getRoomCommentByIdService = async(id) => {
    id = parseInt(id)
    let roomComment = null;
    try{
        roomComment = RoomComment.findOne({
            where: { id: id },
            attributes: ['id', 'room_id', 'comment', 'images_url', 'rating', 'createdAt', 'updatedAt']
        })
        return roomComment
    }
    catch{
        console.log("Cannot fetch room comment by id");
        throw new Error(err)
    }
}

const createRoomComment = async(roomComment) => {
    const newRoomComment = {
        ...roomComment
    }
    
    try{
        await Room.create({
            ...newRoomComment,
            room_id: newRoom.room_id
        })
        return "Created room comment successfully!"
    }
    catch(err){
        console.log("Cannot create room comment");
        throw new Error(err)
    }
}

const deleteRoomCommentService = async(id) => {
    try {
        await RoomComment.destroy({
            where : {
                id : id
            }
        })
        return `Room comment with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete room comment by id");
        throw new Error(err)
    }

}
const updateRoomCommentService = async(id, data) => {
    try {
        await Room.update(data, {
            where: { id : id}
        })
        return `Room comment with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}



module.exports = {
    getAllRoomComment, 
    getRoomCommentByIdService,
    createRoomComment,
    updateRoomCommentService,
    deleteRoomCommentService
}