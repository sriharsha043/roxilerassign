// routes/index.route.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const statisticsController = require('../controllers/statisticsController')

// Import routes
const statisticsRoutes = require('./statisticsRoutes')
const transactionRoutes = require('./transactionRoutes');

// Use routes
router.use('/statistics', statisticsRoutes)
router.use('/transactions', transactionRoutes);

module.exports = router;