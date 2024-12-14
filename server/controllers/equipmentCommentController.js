const { getAllEquipmentComment,
     getEquipmentCommentByIdService,
      createEquipmentComment,
       deleteEquipmentCommentService,
        updateEquipmentCommentService } = require("../service/equipmentCommentService");

const getEquipmentComments = async(req, res)=>{
    const data = await getAllEquipmentComment()

    if(!data) {
        return res.status(404).json({message: "No equipment comment found"})
    }
    return res.status(200).json(data)
}

const getEquipmentCommentById = async(req, res) => {
    const id = req.params.id
    const data = await getEquipmentCommentByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No equipment comment found"})
    }
    return res.status(200).json(data)

}

const addEquipmentComment = async(req, res)=>{
    const data = req.body
    const message = await createEquipmentComment(data)
    if(!message){
        return res.status(400).json({message: "Failed to create equipment comment"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteEquipmentComment = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deleteEquipmentCommentService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete equipment comment"})
    }
    return res.status(200).json({message: message})
}

const updateEquipmentComment = async(req, res) => {
    const update_id = req.params.id
    const message = await updateEquipmentCommentService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update equipment comment"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getEquipmentComments,
    getEquipmentCommentById,
    addEquipmentComment,
    deleteEquipmentComment,
    updateEquipmentComment
}