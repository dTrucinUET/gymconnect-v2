const { getAllService, getServiceByIdService, createService, deleteServiceService, updateServiceService } = require("../service/serviceService");

const getServices = async(req, res)=>{
    const data = await getAllService()

    if(!data) {
        return res.status(404).json({message: "No Services found"})
    }
    return res.status(200).json(data)
}

const getServiceById = async(req, res) => {
    const id = req.params.id
    const data = await getServiceByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No Services found"})
    }
    return res.status(200).json(data)

}

const addService = async(req, res)=>{
    const data = req.body
    const message = await createService(data)
    if(!message){
        return res.status(400).json({message: "Failed to create Service"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteService = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deleteServiceService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete Service"})
    }
    return res.status(200).json({message: message})
}

const updateService = async(req, res) => {
    const update_id = req.params.id
    const message = await updateServiceService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update Service"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getServices,
    getServiceById,
    addService,
    deleteService,
    updateService
}