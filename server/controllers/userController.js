const { getUserList, createNewUser, deleteUserService, getUserByIdService, updateUserInfor } = require("../service/userService");

const getUsers = async (req, res) => {
    const data = await getUserList()

    if (!data) {
        return res.status(404).json({ message: "No Users found" })
    }
    return res.status(200).json(data)
}

const getUserById = async (req, res) => {
    const id = req.params.id
    const data = await getUserByIdService(id)

    if (!data) {
        return res.status(404).json({ message: "No Users found" })
    }
    return res.status(200).json(data)

}

const addUser = async (req, res) => {
    const data = req.body
    const message = await createNewUser(data)
    if (!message) {
        return res.status(400).json({ message: "Failed to create User" })
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteUser = async (req, res) => {

    const delete_id = req.params.id
    const message = await deleteUserService(delete_id)
    if (!message) {
        return res.status(400).json({ message: "Failed to delete User" })
    }
    return res.status(200).json({ message: message })
}

const updateUser = async (req, res) => {
    console.log('hit update user');

    const update_id = req.params.id
    const message = await updateUserInfor(update_id, req.body)
    if (!message) {
        return res.status(400).json({ message: "Failed to update User" })
    }
    return res.status(200).json({ message: message })
}


// Export of all methods as object
module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser
}