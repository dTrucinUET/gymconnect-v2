const sequelize = require('../config/sequelize.js');
const RoomCommentModel = require('../models/room_comments.js')
const UserModel = require('../models/users.js')
const { DataTypes } = require('sequelize');
const moment = require('moment');

const Sequelize_In = sequelize
const RoomComment = RoomCommentModel(Sequelize_In, DataTypes)
const User = UserModel(Sequelize_In, DataTypes)


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



const getCommentByRoomService = async (roomId) => {
    try {
        const roomComments = await RoomComment.findAll({
            where: { room_id: roomId },
            attributes: ['comment', 'images_url', 'rating', 'createdAt', 'user_id']
        });
        const userIds = [...new Set(roomComments.map(comment => comment.user_id))];

        const users = await User.findAll({
            where: { id: userIds },
            attributes: ['id', 'username', 'first_name', 'last_name']
        });

        const userMap = users.reduce((map, user) => {
            map[user.id] = {
                username: user.username,
                fullname: `${user.first_name} ${user.last_name}`
            };
            return map;
        }, {});

        const results = roomComments.map(comment => {
            const createdAt = moment(comment.createdAt);
            const timeAgo = createdAt.fromNow();

            return {
                username: userMap[comment.user_id]?.username || 'Unknown',
                fullname: userMap[comment.user_id]?.fullname || 'Unknown',
                comment: comment.comment,
                images_url: comment.images_url,
                rating: comment.rating,
                time_ago: timeAgo
            };
        });

        // console.log("result", results);
        
        return results;
    } catch (err) {
        console.error("Cannot fetch comments for room id:", roomId);
        throw new Error(err);
    }
};

module.exports = {
    getAllRoomComment,
    getRoomCommentByIdService,
    createRoomComment,
    updateRoomCommentService,
    deleteRoomCommentService,
    getCommentByRoomService
};