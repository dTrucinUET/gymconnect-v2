const { Router } = require('express');

// Local Modules
const equipmentCommentController = require('../controllers/equipmentCommentController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', equipmentCommentController.getEquipmentCommentById);
router.get('/', equipmentCommentController.getEquipmentComments);
router.post('/', equipmentCommentController.addEquipmentComment);
router.put('/:id', equipmentCommentController.updateEquipmentComment);
router.delete('/:id', equipmentCommentController.deleteEquipmentComment);


module.exports = router;