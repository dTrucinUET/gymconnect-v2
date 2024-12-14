const sequelize = require('../config/sequelize.js');
const RolePermissionModel = require('../models/role_permission.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const RolePermission = RolePermissionModel(Sequelize_In, DataTypes)

const getAllRolePermission = async() => {
    let rolePermissions = null;
    try{
        rolePermissions = await RolePermission.findAll({
            attributes: ['id', 'role_id', 'permission_id', 'createdAt', 'updatedAt']
        })
    }
    catch(err) {
        console.log("Cannot fetch all RolePermissions");
        
        throw new Error(err)
    }
    return rolePermissions
}


const getRolePermissionByIdService = async(id) => {
    id = parseInt(id)
    let rolePermission = null;
    try{
        rolePermission = RolePermission.findOne({
            where: { id: id },
            attributes: ['id', 'role_id', 'permission_id', 'createdAt', 'updatedAt']
        })
        return rolePermission
    }
    catch{
        console.log("Cannot fetch RolePermission by id");
        throw new Error(err)
    }
}

const createRolePermission = async(rolePermission) => {
    const newRolePermission = {
        ...rolePermission
    }
    
    try{
        await RolePermission.create({
            ...newRolePermission,
            role_id: newRolePermission.role_id,
            permission_id: newRolePermission.permission_id
        })
        return "Created RolePermission successfully!"
    }
    catch(err){
        console.log("Cannot create RolePermission");
        throw new Error(err)
    }
}

const deleteRolePermissionService = async(id) => {
    try {
        await RolePermission.destroy({
            where : {
                id : id
            }
        })
        return `RolePermission with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete RolePermission by id");
        throw new Error(err)
    }

}
const updateRolePermissionService = async(id, data) => {
    try {
        await RolePermission.update(data, {
            where: { id : id}
        })
        return `RolePermission with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}



module.exports = {
    getAllRolePermission, 
    getRolePermissionByIdService,
    createRolePermission,
    updateRolePermissionService,
    deleteRolePermissionService
}