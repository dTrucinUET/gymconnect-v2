const { Router } = require('express');

// Local Modules
const userController = require('../controllers/userController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', userController.getUserById);
router.get('/', userController.getUsers);
router.post('/', userController.addUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;