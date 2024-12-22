const { getAllRoom, createRoom, deleteRoomService, getRoomByIdService, updateRoomService } = require("../service/roomService");
const multer = require('multer')
const path = require('path')

const getRooms = async (req, res) => {
    console.log(req.originalUrl);

    const data = await getAllRoom()

    if (!data) {
        return res.status(404).json({ message: "No rooms found" })
    }
    return res.status(200).json(data)
}

const getRoomById = async (req, res) => {
    const id = req.params.id
    const data = await getRoomByIdService(id)

    if (!data) {
        return res.status(404).json({ message: "No rooms found" })
    }
    return res.status(200).json(data)

}

const addRoom = async (req, res) => {
    const data = req.body
    // const image = req.file
    console.log("room controller", data);
    
    const message = await createRoom(data)
    if (!message) {
        return res.status(400).json({ message: "Failed to create room" })
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteRoom = async (req, res) => {

    const delete_id = req.params.id
    const message = await deleteRoomService(delete_id)
    if (!message) {
        return res.status(400).json({ message: "Failed to delete room" })
    }
    return res.status(200).json({ message: message })
}

const updateRoom = async (req, res) => {
    console.log('hit update room');

    const update_id = req.params.id
    const message = await updateRoomService(update_id, req.body)
    if (!message) {
        return res.status(400).json({ message: "Failed to update room" })
    }
    return res.status(200).json({ message: message })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

// Export of all methods as object
module.exports = {
    getRooms,
    getRoomById,
    addRoom,
    deleteRoom,
    updateRoom,
    upload
}