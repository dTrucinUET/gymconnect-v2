const { Router } = require('express');

// Local Modules
const logsController = require('../controllers/logsController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', logsController.getLogById);
router.get('/', logsController.getLogs);
router.post('/', logsController.addLog);
router.put('/:id', logsController.updateLog);
router.delete('/:id', logsController.deleteLog);


module.exports = router;