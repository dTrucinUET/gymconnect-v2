const { getAllTransactionLog,
     getTransactionLogByIdService,
      createTransactionLog,
       deleteTransactionLogService,
        updateTransactionLogService } = require("../service/transactionLogService");

const getTransactionLogs = async(req, res)=>{
    const data = await getAllTransactionLog()

    if(!data) {
        return res.status(404).json({message: "No Transaction Logs found"})
    }
    return res.status(200).json(data)
}

const getTransactionLogById = async(req, res) => {
    const id = req.params.id
    const data = await getTransactionLogByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No Transaction Logs found"})
    }
    return res.status(200).json(data)

}

const addTransactionLog = async(req, res)=>{
    const data = req.body
    const message = await createTransactionLog(data)
    if(!message){
        return res.status(400).json({message: "Failed to create Transaction Log"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteTransactionLog = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deleteTransactionLogService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete Transaction Log"})
    }
    return res.status(200).json({message: message})
}

const updateTransactionLog = async(req, res) => {
    const update_id = req.params.id
    const message = await updateTransactionLogService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update Transaction Log"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getTransactionLogs,
    getTransactionLogById,
    addTransactionLog,
    deleteTransactionLog,
    updateTransactionLog
}