const { Router } = require('express');

// Local Modules
const serviceCommentController = require('../controllers/serviceCommentController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', serviceCommentController.getServiceCommentById);
router.get('/', serviceCommentController.getServiceComments);
router.post('/', serviceCommentController.addServiceComment);
router.put('/:id', serviceCommentController.updateServiceComment);
router.delete('/:id', serviceCommentController.deleteServiceComment);


module.exports = router;