const sequelize = require('../config/sequelize.js');
const { DataTypes } = require('sequelize');

const TransactionModel = require('../models/transactions.js')
const TransactionLogModel = require('../models/transactionLogs.js')
const RoomModel = require('../models/rooms.js')
const UserRoomModel = require('../models/user_room.js')
const ServiceModel = require('../models/services.js')

const Sequelize_In = sequelize

const Transaction = TransactionModel(Sequelize_In, DataTypes)
const TransactionLog = TransactionLogModel(Sequelize_In, DataTypes)
const UserRoom = UserRoomModel(Sequelize_In, DataTypes)
const Service = ServiceModel(Sequelize_In, DataTypes)
const Room = RoomModel(Sequelize_In, DataTypes)

// web hook uel using ngrok
// https://8d3e-42-113-242-36.ngrok-free.app/receive-hook

const hookReceive = async(req, res)=>{
    const { data } = req.body
    const description = data.description
    const status = data.desc
    const isSuccess = (status === 'success') ? true : false
    const data_array = description.toString().split(' ')
    const userId = parseInt(data_array[2])
    const serviceId = parseInt(data_array[4])
    const quantity = parseInt(data_array[6])
    console.log(req.body);
    if(isSuccess){
        console.log("Success");
        
        try{
            const transaction = await Transaction.create({
                user_id: userId,
                service_id: serviceId,
                status: 'completed',
                days: 2
            })
            
            const service = await Service.findOne({
                where: {
                    id: serviceId
                }
            })
    
            const updateService = await Service.update({
                amount: service.amount - quantity
            }, {
                where : {
                    id: serviceId
                }
            })
    
            const room = await Room.findOne({
                where: {
                    id: service.room_id
                }
            })
    
            const user_room = await UserRoom.create({
                user_id: userId,
                room_id: room.id
            })
            
            const transaction_logs = await TransactionLog.create({
                transaction_id: transaction.id,
                event: description
            })

        } catch(err){
            throw new Error(err)
            
        }
        

    }
    else{
        const transaction = await Transaction.create({
            user_id: userId,
            service_id: serviceId,
            status: 'failed'
        })
    }

    res.json()
}
module.exports = {
    hookReceive
}