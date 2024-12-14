const sequelize = require('../config/sequelize.js');
const TransactionModel = require('../models/transactions.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const Transaction = TransactionModel(Sequelize_In, DataTypes)

const getAllTransaction = async() => {
    let transactions = null;
    try{
        transactions = await Transaction.findAll({
            attributes: ['id', 'service_id', 'user_id', 'status', 'createdAt', 'updatedAt']
        })
    }
    catch(err) {
        console.log("Cannot fetch all Transactions");
        
        throw new Error(err)
    }
    return transactions
}


const getTransactionByIdService = async(id) => {
    id = parseInt(id)
    let transaction = null;
    try{
        transaction = Transaction.findOne({
            where: { id: id },
            attributes: ['id', 'service_id', 'user_id', 'status', 'createdAt', 'updatedAt']
        })
        return transaction
    }
    catch{
        console.log("Cannot fetch Transaction by id");
        throw new Error(err)
    }
}

const createTransaction = async(transaction) => {
    const newTransaction = {
        ...transaction
    }
    
    try{
        await Transaction.create({
            ...newTransaction,
            user_id: newTransaction.user_id,
            service_id: newTransaction.service_id,
        })
        return "Created Transaction successfully!"
    }
    catch(err){
        console.log("Cannot create Transaction");
        throw new Error(err)
    }
}

const deleteTransactionService = async(id) => {
    try {
        await Transaction.destroy({
            where : {
                id : id
            }
        })
        return `Transaction with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete Transaction by id");
        throw new Error(err)
    }

}
const updateTransactionService = async(id, data) => {
    try {
        await Transaction.update(data, {
            where: { id : id}
        })
        return `Transaction with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}



module.exports = {
    getAllTransaction, 
    getTransactionByIdService,
    createTransaction,
    updateTransactionService,
    deleteTransactionService
}