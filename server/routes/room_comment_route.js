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
router.get('/room/:roomId', roomCommentController.getCommentByRoom);


module.exports = router;