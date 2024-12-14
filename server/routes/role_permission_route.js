const { Router } = require('express');

// Local Modules
const rolePermissionController = require('../controllers/rolesPermissionController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', rolePermissionController.getRolePermissionById);
router.get('/', rolePermissionController.getRolePermissions);
router.post('/', rolePermissionController.addRolePermission);
router.put('/:id', rolePermissionController.updateRolePermission);
router.delete('/:id', rolePermissionController.deleteRolePermission);


module.exports = router;