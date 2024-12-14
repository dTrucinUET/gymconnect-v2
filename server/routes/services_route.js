const { Router } = require('express');

// Local Modules
const serviceController = require('../controllers/serviceController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', serviceController.getServiceById);
router.get('/', serviceController.getServices);
router.post('/', serviceController.addService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);


module.exports = router;