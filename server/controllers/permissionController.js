const { getAllPermission,
     getPermissionByIdService,
      createPermission,
       deletePermissionService,
        updatePermissionService } = require("../service/permissionService");

const getPermissions = async(req, res)=>{
    const data = await getAllPermission()

    if(!data) {
        return res.status(404).json({message: "No Permissions found"})
    }
    return res.status(200).json(data)
}

const getPermissionById = async(req, res) => {
    const id = req.params.id
    const data = await getPermissionByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No Permissions found"})
    }
    return res.status(200).json(data)

}

const addPermission = async(req, res)=>{
    const data = req.body
    const message = await createPermission(data)
    if(!message){
        return res.status(400).json({message: "Failed to create Permission"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deletePermission = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deletePermissionService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete Permission"})
    }
    return res.status(200).json({message: message})
}

const updatePermission = async(req, res) => {
    const update_id = req.params.id
    const message = await updatePermissionService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update Permission"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getPermissions,
    getPermissionById,
    addPermission,
    deletePermission,
    updatePermission
}