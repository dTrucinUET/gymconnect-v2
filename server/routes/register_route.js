const { Router } = require('express');

// Local Modules
const registerController = require('../controllers/authController')

// Initialization
const router = Router();

// Requests 

router.post('/', registerController.register);


module.exports = router;