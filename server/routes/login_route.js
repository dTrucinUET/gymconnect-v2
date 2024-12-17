const { Router } = require('express');

// Local Modules
const loginController = require('../controllers/authController')

// Initialization
const router = Router();

// Requests 

router.post('/', loginController.login);


module.exports = router;