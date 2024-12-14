const { getAllEquipment, getEquipmentByIdService, deleteEquipmentService, createEquipment, updateEquipmentService } = require("../service/equipmentService");

const getEquipments = async(req, res)=>{
    const data = await getAllEquipment()

    if(!data) {
        return res.status(404).json({message: "No equipment found"})
    }
    return res.status(200).json(data)
}

const getEquipmentById = async(req, res) => {
    const id = req.params.id
    const data = await getEquipmentByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No equipment found"})
    }
    return res.status(200).json(data)

}

const addEquipment = async(req, res)=>{
    const data = req.body
    const message = await createEquipment(data)
    if(!message){
        return res.status(400).json({message: "Failed to create equipment"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteEquipment = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deleteEquipmentService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete equipment"})
    }
    return res.status(200).json({message: message})
}

const updateEquipment = async(req, res) => {
    const update_id = req.params.id
    const message = await updateEquipmentService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update equipment"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getEquipments,
    getEquipmentById,
    addEquipment,
    deleteEquipment,
    updateEquipment
}