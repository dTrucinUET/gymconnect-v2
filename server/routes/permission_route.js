const { Router } = require('express');

// Local Modules
const permissionController = require('../controllers/permissionController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', permissionController.getPermissionById);
router.get('/', permissionController.getPermissions);
router.post('/', permissionController.addPermission);
router.put('/:id', permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);


module.exports = router;