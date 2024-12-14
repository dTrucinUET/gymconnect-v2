const { Router } = require('express');

// Local Modules
const roomCommentController = require('../controllers/roomCommentController.js')

// Initialization
const router = Router();



// Requests 
router.get('/:id', roomCommentController.getRoomCommentById);
router.get('/', roomCommentController.getRoomComments);
router.post('/', roomCommentController.addRoomComments);
router.put('/:id', roomCommentController.deleteRoomComment);
router.delete('/:id', roomCommentController.updateRoomComment);


module.exports = router;