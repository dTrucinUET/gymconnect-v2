const { Router } = require('express');

// Local Modules
const transactionLogController = require('../controllers/transactionLogsController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', transactionLogController.getTransactionLogById);
router.get('/', transactionLogController.getTransactionLogs);
router.post('/', transactionLogController.addTransactionLog);
router.put('/:id', transactionLogController.updateTransactionLog);
router.delete('/:id', transactionLogController.deleteTransactionLog);


module.exports = router;