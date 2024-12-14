const sequelize = require('../config/sequelize.js');
const TransactionLogModel = require('../models/transactionLogs.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const TransactionLog = TransactionLogModel(Sequelize_In, DataTypes)

const getAllTransactionLog = async() => {
    let transactionLogs = null;
    try{
        transactionLogs = await TransactionLog.findAll({
            attributes: ['id', 'event', 'transaction_id', 'createdAt', 'updatedAt']
        })
    }
    catch(err) {
        console.log("Cannot fetch all Transaction Logs");
        
        throw new Error(err)
    }
    return transactionLogs
}


const getTransactionLogByIdService = async(id) => {
    id = parseInt(id)
    let transactionLog = null;
    try{
        transactionLog = TransactionLog.findOne({
            where: { id: id },
            attributes: ['id', 'event', 'transaction_id', 'createdAt', 'updatedAt']
        })
        return transactionLog
    }
    catch{
        console.log("Cannot fetch Transaction Log by id");
        throw new Error(err)
    }
}

const createTransactionLog = async(transactionLog) => {
    const newTransactionLog = {
        ...transactionLog
    }
    
    try{
        await TransactionLog.create({
            ...newTransactionLog,
            transaction_id: newTransactionLog.transaction_id
        })
        return "Created Transaction Log successfully!"
    }
    catch(err){
        console.log("Cannot create Transaction Log");
        throw new Error(err)
    }
}

const deleteTransactionLogService = async(id) => {
    try {
        await TransactionLog.destroy({
            where : {
                id : id
            }
        })
        return `Transaction Log with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete Transaction Log by id");
        throw new Error(err)
    }

}
const updateTransactionLogService = async(id, data) => {
    try {
        await TransactionLog.update(data, {
            where: { id : id}
        })
        return `Transaction Log with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}



module.exports = {
    getAllTransactionLog, 
    getTransactionLogByIdService,
    createTransactionLog,
    updateTransactionLogService,
    deleteTransactionLogService
}