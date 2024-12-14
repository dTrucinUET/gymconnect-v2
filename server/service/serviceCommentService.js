const sequelize = require('../config/sequelize.js');
const ServiceCommentModel = require('../models/service_comments.js')
const { DataTypes } = require('sequelize');

const Sequelize_In = sequelize
const ServiceComment = ServiceCommentModel(Sequelize_In, DataTypes)

const getAllServiceComment = async() => {
    let serviceComments = null;
    try{
        serviceComments = await ServiceComment.findAll({
            attributes: ['id', 'comment', 'service_id', 'images_url', 'rating', 'createdAt', 'updatedAt']
        })
    }
    catch(err) {
        console.log("Cannot fetch all Service Comments");
        
        throw new Error(err)
    }
    return serviceComments
}


const getServiceCommentByIdService = async(id) => {
    id = parseInt(id)
    let serviceComment = null;
    try{
        serviceComment = ServiceComment.findOne({
            where: { id: id },
            attributes: ['id', 'comment', 'service_id', 'images_url', 'rating', 'createdAt', 'updatedAt']
        })
        return serviceComment
    }
    catch{
        console.log("Cannot fetch Service Comment by id");
        throw new Error(err)
    }
}

const createServiceComment = async(serviceComment) => {
    const newServiceComment = {
        ...serviceComment
    }
    
    try{
        await ServiceComment.create({
            ...newServiceComment,
            service_id: newServiceComment.service_id
        })
        return "Created Service Comment successfully!"
    }
    catch(err){
        console.log("Cannot create Service Comment");
        throw new Error(err)
    }
}

const deleteServiceCommentService = async(id) => {
    try {
        await ServiceComment.destroy({
            where : {
                id : id
            }
        })
        return `Service Comment with id:${id} deleted successfully!`
    }
    catch(err){
        console.log("Cannot delete Service Comment by id");
        throw new Error(err)
    }

}
const updateServiceCommentService = async(id, data) => {
    try {
        await ServiceComment.update(data, {
            where: { id : id}
        })
        return `Service Comment with id: ${id} updated successfully!`
    }
    catch(err){
        throw new Error(err)
    }
}



module.exports = {
    getAllServiceComment, 
    getServiceCommentByIdService,
    createServiceComment,
    updateServiceCommentService,
    deleteServiceCommentService
}