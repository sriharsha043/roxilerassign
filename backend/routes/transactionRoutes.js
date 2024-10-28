// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController')

//Initialize
router.post('/initialize', transactionController.fetchAndSeedTransactions);

//transactions
router.get('/getTransactions', transactionController.getTransactions);


module.exports = router;
