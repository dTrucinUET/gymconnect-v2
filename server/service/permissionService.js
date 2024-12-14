const sequelize = require('../config/sequelize.js');
const PermissionModel = require('../models/permissions.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const Permission = PermissionModel(Sequelize_In, DataTypes)

const getAllPermission = async() => {
    let permissions = null;
    try{
        permissions = await Permission.findAll({
            attributes: ['id', 'name', 'owner_id', 'description', 'location', 'rating', 'createdAt', 'updatedAt']
        })
    }
    catch(err) {
        console.log("Cannot fetch all Permissions");
        
        throw new Error(err)
    }
    return permissions
}


const getPermissionByIdService = async(id) => {
    id = parseInt(id)
    let permission = null;
    try{
        permission = Permission.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'owner_id', 'description', 'location', 'rating', 'createdAt', 'updatedAt']
        })
        return permission
    }
    catch{
        console.log("Cannot fetch Permission by id");
        throw new Error(err)
    }
}

const createPermission = async(permission) => {
    const newPermission = {
        ...permission
    }
    
    try{
        await Permission.create({
            ...newPermission
        })
        return "Created Permission successfully!"
    }
    catch(err){
        console.log("Cannot create Permission");
        throw new Error(err)
    }
}

const deletePermissionService = async(id) => {
    try {
        await Permission.destroy({
            where : {
                id : id
            }
        })
        return `Permission with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete Permission by id");
        throw new Error(err)
    }

}
const updatePermissionService = async(id, data) => {
    try {
        await Permission.update(data, {
            where: { id : id}
        })
        return `Permission with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}



module.exports = {
    getAllPermission, 
    getPermissionByIdService,
    createPermission,
    updatePermissionService,
    deletePermissionService
}