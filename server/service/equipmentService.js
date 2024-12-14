const sequelize = require('../config/sequelize.js');
const EquimentModel = require('../models/equipments.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const Equipment = EquimentModel(Sequelize_In, DataTypes)

const getAllEquipment = async() => {
    let equipments = null;
    try{
        equipments = await Equipment.findAll({
            attributes: ['id', 'name', 'room_id', 'description', 'amount', 'rating', 'createdAt', 'updatedAt'] 
        })
    }
    catch(err) {
        console.log("Cannot fetch all equipments");
        
        throw new Error(err)
    }
    return equipments
}


const getEquipmentByIdService = async(id) => {
    id = parseInt(id)
    let equipment = null;
    try{
        equipment = Equipment.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'room_id', 'description', 'amount', 'rating', 'createdAt', 'updatedAt']
        })
        return equipment
    }
    catch{
        console.log("Cannot fetch Equiment by id");
        throw new Error(err)
    }
}

const createEquipment = async(equipment) => {
    const newEquipment = {
        ...equipment
    }
    
    try{
        await Equipment.create({
            ...newEquipment,
            owner_id: newEquipment.owner_id
        })
        return "Created Equipment successfully!"
    }
    catch(err){
        console.log("Cannot create Equipment");
        throw new Error(err)
    }
}

const deleteEquipmentService = async(id) => {
    try {
        await Equipment.destroy({
            where : {
                id : id
            }
        })
        return `Equipment with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete Equipment by id");
        throw new Error(err)
    }

}
const updateEquipmentService = async(id, data) => {
    try {
        await Equipment.update(data, {
            where: { id : id}
        })
        return `Equiment with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}



module.exports = {
    getAllEquipment, 
    getEquipmentByIdService,
    createEquipment,
    updateEquipmentService,
    deleteEquipmentService
}