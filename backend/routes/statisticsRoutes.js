const express = require('express');
const statisticsController = require('../controllers/statisticsController')
const router = express.Router();

// routes/statisticsRoutes.js
router.get('/getStatistics', statisticsController.getStatistics);
router.get('/getPieChartData', statisticsController.getPieChartData)
router.get('/getBarChartData', statisticsController.getBarChartData)


module.exports = router