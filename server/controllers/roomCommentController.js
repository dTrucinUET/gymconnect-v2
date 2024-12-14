const {getAllRoomComment, deleteRoomCommentService, getRoomCommentByIdService, createRoomComment, updateRoomCommentService} = require('../service/roomCommentService.js')

const getRoomComments = async(req, res)=>{
    const data = await getAllRoomComment()

    if(!data) {
        return res.status(404).json({message: "No room comments found"})
    }
    return res.status(200).json(data)
}

const getRoomCommentById = async(req, res) => {
    const id = req.params.id
    const data = await getRoomCommentByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No room comment found"})
    }
    return res.status(200).json(data)

}

const addRoomComments = async(req, res)=>{
    const data = req.body
    const message = await createRoomComment(data)
    if(!message){
        return res.status(400).json({message: "Failed to create room comment"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteRoomComment = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deleteRoomCommentService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete room comment"})
    }
    return res.status(200).json({message: message})
}

const updateRoomComment = async(req, res) => {
    const update_id = req.params.id
    const message = await updateRoomCommentService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update room"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getRoomCommentById,
    getRoomComments,
    addRoomComments,
    deleteRoomComment,
    updateRoomComment
}