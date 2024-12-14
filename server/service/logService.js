const sequelize = require('../config/sequelize.js');
const LogModel = require('../models/logs.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const Log = LogModel(Sequelize_In, DataTypes)

const getAllLogs = async() => {
    let logs = null;
    try{
        logs = await Log.findAll({
            attributes: ['id', 'event', 'user_id', 'createdAt', 'updatedAt']
        })
    }
    catch(err) {
        console.log("Cannot fetch all logs");
        
        throw new Error(err)
    }
    return logs
}


const getLogByIdService = async(id) => {
    id = parseInt(id)
    let log = null;
    try{
        log = Log.findOne({
            where: { id: id },
            attributes: ['id', 'event', 'user_id', 'createdAt', 'updatedAt']
        })
        return log
    }
    catch{
        console.log("Cannot fetch log by id");
        throw new Error(err)
    }
}

const createLog = async(log) => {
    const newlog = {
        ...log
    }
    
    try{
        await Log.create({
            ...newlog,
            user_id: newlog.user_id
        })
        return "Created log successfully!"
    }
    catch(err){
        console.log("Cannot create log");
        throw new Error(err)
    }
}

const deleteLogService = async(id) => {
    try {
        await Log.destroy({
            where : {
                id : id
            }
        })
        return `log with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete log by id");
        throw new Error(err)
    }

}
const updateLogService = async(id, data) => {
    try {
        await Log.update(data, {
            where: { id : id}
        })
        return `log with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}



module.exports = {
    getAllLogs, 
    getLogByIdService,
    createLog,
    updateLogService,
    deleteLogService
}