const { Router } = require('express');

// Local Modules
const transactionController = require('../controllers/transactionController')

// Initialization
const router = Router();

// Requests 
router.get('/:id', transactionController.getTransactionById);
router.get('/', transactionController.getTransactions);
router.post('/', transactionController.addTransaction);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);


module.exports = router;