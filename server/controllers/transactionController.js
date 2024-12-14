const { getAllTransaction,
     getTransactionByIdService,
      createTransaction,
       deleteTransactionService,
        updateTransactionService } = require("../service/transactionService");

const getTransactions = async(req, res)=>{
    const data = await getAllTransaction()

    if(!data) {
        return res.status(404).json({message: "No Transactions found"})
    }
    return res.status(200).json(data)
}

const getTransactionById = async(req, res) => {
    const id = req.params.id
    const data = await getTransactionByIdService(id)

    if(!data) {
        return res.status(404).json({message: "No Transactions found"})
    }
    return res.status(200).json(data)

}

const addTransaction = async(req, res)=>{
    const data = req.body
    const message = await createTransaction(data)
    if(!message){
        return res.status(400).json({message: "Failed to create Transaction"})
    }
    return res.status(200).json({
        'message': `${message}`,
    })
}

const deleteTransaction = async(req, res) => {

    const delete_id = req.params.id
    const message =  await deleteTransactionService(delete_id)
    if(!message){
        return res.status(400).json({message: "Failed to delete Transaction"})
    }
    return res.status(200).json({message: message})
}

const updateTransaction = async(req, res) => {
    const update_id = req.params.id
    const message = await updateTransactionService(update_id, req.body)
    if(!message) {
        return res.status(400).json({message: "Failed to update Transaction"})
    }
    return res.status(200).json({message: message})
}


// Export of all methods as object
module.exports = {
    getTransactions,
    getTransactionById,
    addTransaction,
    deleteTransaction,
    updateTransaction
}