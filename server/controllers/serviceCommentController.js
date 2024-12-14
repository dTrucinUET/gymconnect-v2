const { getAllServiceComment,
     getServiceCommentByIdService,
      createServiceComment,
      deleteServiceCommentService,
       updateServiceCommentService } = require("../service/serviceCommentService");

const getServiceComments = async(req, res)=>{
    const data = await getAllServiceComment()

    if(!data) {
        return res.status(404).json({message: "No Service Comments found"})
    }
    return res.status(200).json(data)
}

const getServiceCommentById = async(req, res) => {
    const id = req.params.id
    const data = await getServiceCommentByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No Service Comments found"})
    }
    return res.status(200).json(data)

}

const addServiceComment = async(req, res)=>{
    const data = req.body
    const message = await createServiceComment(data)
    if(!message){
        return res.status(400).json({message: "Failed to create Service Comment"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteServiceComment = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deleteServiceCommentService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete Service Comment"})
    }
    return res.status(200).json({message: message})
}

const updateServiceComment = async(req, res) => {
    const update_id = req.params.id
    const message = await updateServiceCommentService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update Service Comment"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getServiceComments,
    getServiceCommentById,
    addServiceComment,
    deleteServiceComment,
    updateServiceComment
}