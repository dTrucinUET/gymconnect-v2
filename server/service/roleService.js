const sequelize = require('../config/sequelize.js');
const RoleModel = require('../models/roles.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const Role = RoleModel(Sequelize_In, DataTypes)

const getAllRole = async() => {
    let roles = null;
    try{
        roles = await Role.findAll({
            attributes: ['id', 'role_name', 'createdAt', 'updatedAt']
        })
    }
    catch(err) {
        console.log("Cannot fetch all Roles");
        
        throw new Error(err)
    }
    return roles
}


const getRoleByIdService = async(id) => {
    id = parseInt(id)
    let role = null;
    try{
        role = Role.findOne({
            where: { id: id },
            attributes: ['id', 'role_name', 'createdAt', 'updatedAt']
        })
        return role
    }
    catch{
        console.log("Cannot fetch Role by id");
        throw new Error(err)
    }
}

const createRole = async(role) => {
    const newRole = {
        ...role
    }
    
    try{
        await Role.create({
            ...newRole        })
        return "Created Role successfully!"
    }
    catch(err){
        console.log("Cannot create Role");
        throw new Error(err)
    }
}

const deleteRoleService = async(id) => {
    try {
        await Role.destroy({
            where : {
                id : id
            }
        })
        return `Role with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete Role by id");
        throw new Error(err)
    }

}
const updateRoleService = async(id, data) => {
    try {
        await Role.update(data, {
            where: { id : id}
        })
        return `Role with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}


module.exports = {
    getAllRole, 
    getRoleByIdService,
    createRole,
    updateRoleService,
    deleteRoleService
}