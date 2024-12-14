const { getAllRolePermission,
     getRolePermissionByIdService,
      createRolePermission,
       deleteRolePermissionService,
        updateRolePermissionService } = require("../service/rolePermissionService");

const getRolePermissions = async(req, res)=>{
    const data = await getAllRolePermission()

    if(!data) {
        return res.status(404).json({message: "No Role Permissions found"})
    }
    return res.status(200).json(data)
}

const getRolePermissionById = async(req, res) => {
    const id = req.params.id
    const data = await getRolePermissionByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No Role Permissions found"})
    }
    return res.status(200).json(data)

}

const addRolePermission = async(req, res)=>{
    const data = req.body
    const message = await createRolePermission(data)
    if(!message){
        return res.status(400).json({message: "Failed to create Role Permission"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteRolePermission = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deleteRolePermissionService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete Role Permission"})
    }
    return res.status(200).json({message: message})
}

const updateRolePermission = async(req, res) => {
    const update_id = req.params.id
    const message = await updateRolePermissionService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update Role Permission"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getRolePermissions,
    getRolePermissionById,
    addRolePermission,
    deleteRolePermission,
    updateRolePermission
}