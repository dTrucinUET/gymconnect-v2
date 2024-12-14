const sequelize = require('../config/sequelize.js');
const ServiceModel = require('../models/services.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const Service = ServiceModel(Sequelize_In, DataTypes)

const getAllService = async() => {
    let services = null;
    try{
        services = await Service.findAll({
            attributes: ['id', 'name', 'room_id', 'description', 'balance', 'amount', 'type', 'rating', 'createdAt', 'updatedAt']
        })
    }
    catch(err) {
        console.log("Cannot fetch all Services");
        
        throw new Error(err)
    }
    return services
}


const getServiceByIdService = async(id) => {
    id = parseInt(id)
    let service = null;
    try{
        service = Service.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'room_id', 'description', 'balance', 'amount', 'type', 'rating', 'createdAt', 'updatedAt']
        })
        return service
    }
    catch{
        console.log("Cannot fetch Service by id");
        throw new Error(err)
    }
}

const createService = async(service) => {
    const newService = {
        ...service
    }
    
    try{
        await service.create({
            ...newService,
            room_id: newService.room_id
        })
        return "Created Service successfully!"
    }
    catch(err){
        console.log("Cannot create Service");
        throw new Error(err)
    }
}

const deleteServiceService = async(id) => {
    try {
        await Service.destroy({
            where : {
                id : id
            }
        })
        return `Service with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete Service by id");
        throw new Error(err)
    }

}
const updateServiceService = async(id, data) => {
    try {
        await Service.update(data, {
            where: { id : id}
        })
        return `Service with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}



module.exports = {
    getAllService, 
    getServiceByIdService,
    createService,
    updateServiceService,
    deleteServiceService
}