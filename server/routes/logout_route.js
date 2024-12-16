const { Router } = require('express');

// Local Modules
const logoutController = require('../controllers/authController')

// Initialization
const router = Router();

// Requests 
router.get('/', logoutController.logout);


module.exports = router;