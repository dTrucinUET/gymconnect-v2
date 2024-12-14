const { getAllLogs, getLogByIdService, createLog, deleteLogService, updateLogService } = require("../service/logService");

const getLogs = async(req, res)=>{
    const data = await getAllLogs()

    if(!data) {
        return res.status(404).json({message: "No Logs found"})
    }
    return res.status(200).json(data)
}

const getLogById = async(req, res) => {
    const id = req.params.id
    const data = await getLogByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No Logs found"})
    }
    return res.status(200).json(data)

}

const addLog = async(req, res)=>{
    const data = req.body
    const message = await createLog(data)
    if(!message){
        return res.status(400).json({message: "Failed to create Log"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteLog = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deleteLogService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete Log"})
    }
    return res.status(200).json({message: message})
}

const updateLog = async(req, res) => {
    const update_id = req.params.id
    const message = await updateLogService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update Log"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getLogs,
    getLogById,
    addLog,
    deleteLog,
    updateLog
}