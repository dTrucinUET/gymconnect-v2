const {getAllRoomComment, deleteRoomCommentService, getRoomCommentByIdService, createRoomComment, updateRoomCommentService, getCommentByRoomService} = require('../service/roomCommentService.js')

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


const getCommentByRoom = async (req, res) => {
    const { roomId } = req.params;
    try {
        const roomComments = await getCommentByRoomService(roomId);
        res.status(200).json(roomComments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to fetch comments for the specified room.' });
    }
};

module.exports = {
    getRoomCommentById,
    getRoomComments,
    addRoomComments,
    updateRoomComment,
    deleteRoomComment,
    getCommentByRoom 
};