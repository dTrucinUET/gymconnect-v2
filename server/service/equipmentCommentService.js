const sequelize = require('../config/sequelize.js');
const EquipmentCommentModel = require('../models/equipment_comments.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const EquipmentComment = EquipmentCommentModel(Sequelize_In, DataTypes)

const getAllEquipmentComment = async() => {
    let equipmentComments = null;
    try{
        equipmentComments = await EquipmentComment.findAll({
            attributes: ['id', 'comment', 'equipment_id', 'images_url', 'rating', 'createdAt', 'updatedAt']
        })
    }
    catch(err) {
        console.log("Cannot fetch all equipment comments");
        
        throw new Error(err)
    }
    return equipmentComments
}


const getEquipmentCommentByIdService = async(id) => {
    id = parseInt(id)
    let equipmentComment = null;
    try{
        equipmentComment = EquipmentComment.findOne({
            where: { id: id },
            attributes: ['id', 'comment', 'equipment_id', 'images_url', 'rating', 'createdAt', 'updatedAt']
        })
        return equipmentComment
    }
    catch{
        console.log("Cannot fetch equipment comment by id");
        throw new Error(err)
    }
}

const createEquipmentComment = async(equipmentComment) => {
    const newequipmentComment = {
        ...equipmentComment
    }
    
    try{
        await EquipmentComment.create({
            ...newequipmentComment,
            equipment_id: newequipment.equipment_id
        })
        return "Created equipment comment successfully!"
    }
    catch(err){
        console.log("Cannot create equipment comment");
        throw new Error(err)
    }
}

const deleteEquipmentCommentService = async(id) => {
    try {
        await EquipmentComment.destroy({
            where : {
                id : id
            }
        })
        return `equipment comment with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete equipment comment by id");
        throw new Error(err)
    }

}
const updateEquipmentCommentService = async(id, data) => {
    try {
        await EquipmentComment.update(data, {
            where: { id : id}
        })
        return `equipment comment with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}



module.exports = {
    getAllEquipmentComment, 
    getEquipmentCommentByIdService,
    createEquipmentComment,
    updateEquipmentCommentService,
    deleteEquipmentCommentService
}