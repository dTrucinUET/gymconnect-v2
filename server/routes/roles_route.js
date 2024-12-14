const { Router } = require('express');

// Local Modules
const roleController = require('../controllers/rolesController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', roleController.getRoleById);
router.get('/', roleController.getRoles);
router.post('/', roleController.addRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);


module.exports = router;