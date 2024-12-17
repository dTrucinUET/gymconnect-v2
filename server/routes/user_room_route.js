const { Router } = require('express');
// Local Modules
const userRoomController = require('../controllers/userRoomController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', userRoomController.getUserRoomById);
router.get('/', userRoomController.getUserRooms);
router.post('/', userRoomController.addUserRoom);
router.put('/:id', userRoomController.updateUserRoom);
router.delete('/:id', userRoomController.deleteUserRoom);


module.exports = router;