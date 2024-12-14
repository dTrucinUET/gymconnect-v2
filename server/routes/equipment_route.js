const { Router } = require('express');

// Local Modules
const equipmentController = require('../controllers/equimentController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', equipmentController.getEquipmentById);
router.get('/', equipmentController.getEquipments);
router.post('/', equipmentController.addEquipment);
router.put('/:id', equipmentController.updateEquipment);
router.delete('/:id', equipmentController.deleteEquipment);


module.exports = router;