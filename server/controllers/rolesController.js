const { getAllRole, getRoleByIdService, createRole, deleteRoleService, updateRoleService } = require("../service/roleService");

const getRoles = async(req, res)=>{
    const data = await getAllRole()

    if(!data) {
        return res.status(404).json({message: "No Roles found"})
    }
    return res.status(200).json(data)
}

const getRoleById = async(req, res) => {
    const id = req.params.id
    const data = await getRoleByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No Roles found"})
    }
    return res.status(200).json(data)

}

const addRole = async(req, res)=>{
    const data = req.body
    const message = await createRole(data)
    if(!message){
        return res.status(400).json({message: "Failed to create Role"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteRole = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deleteRoleService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete Role"})
    }
    return res.status(200).json({message: message})
}

const updateRole = async(req, res) => {
    const update_id = req.params.id
    const message = await updateRoleService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update Role"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getRoles,
    getRoleById,
    addRole,
    deleteRole,
    updateRole
}