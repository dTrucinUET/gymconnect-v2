const { Router } = require('express');

// Local Modules
const roomController = require('../controllers/roomController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', roomController.getRoomById);
router.get('/', roomController.getRooms);
router.post('/', roomController.addRoom);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);


module.exports = router;