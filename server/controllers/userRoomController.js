const { getAllUserRoom,
     getUserRoomByIdService,
      createUserRoom,
       deleteUserRoomService,
        updateUserRoomService,
        getUserByRoomId} = require("../service/userRoomService");

const getUserRooms = async(req, res)=>{
    const query_obj = req.query;    
    if(query_obj.roomid){
        const {roomid} = query_obj
        console.log(roomid);
        
        const users =  await getUserByRoomId(roomid)
        return res.status(200).json(users)
    }
    const data = await getAllUserRoom()

    if(!data) {
        return res.status(404).json({message: "No UserRooms found"})
    }
    return res.status(200).json(data)
}

const getUserRoomById = async(req, res) => {
    const id = req.params.id
    const data = await getUserRoomByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No UserRooms found"})
    }
    return res.status(200).json(data)

}

const addUserRoom = async(req, res)=>{
    const data = req.body
    const message = await createUserRoom(data)
    if(!message){
        return res.status(400).json({message: "Failed to create UserRoom"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteUserRoom = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deleteUserRoomService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete UserRoom"})
    }
    return res.status(200).json({message: message})
}

const updateUserRoom = async(req, res) => {
    const update_id = req.params.id
    const message = await updateUserRoomService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update UserRoom"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getUserRooms,
    getUserRoomById,
    addUserRoom,
    deleteUserRoom,
    updateUserRoom
}