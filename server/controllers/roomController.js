const { getAllRoom, createRoom, deleteRoomService, getRoomByIdService, updateRoomService } = require("../service/roomService");

const getRooms = async(req, res)=>{
    const data = await getAllRoom()

    if(!data) {
        return res.status(404).json({message: "No rooms found"})
    }
    return res.status(200).json(data)
}

const getRoomById = async(req, res) => {
    const id = req.params.id
    const data = await getRoomByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No rooms found"})
    }
    return res.status(200).json(data)

}

const addRoom = async(req, res)=>{
    const data = req.body
    const message = await createRoom(data)
    if(!message){
        return res.status(400).json({message: "Failed to create room"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteRoom = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deleteRoomService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete room"})
    }
    return res.status(200).json({message: message})
}

const updateRoom = async(req, res) => {
    const update_id = req.params.id
    const message = await updateRoomService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update room"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getRooms,
    getRoomById,
    addRoom,
    deleteRoom,
    updateRoom
}