const express = require('express');
const router = express.Router();
const multer = require('multer');
const chartHistoryController = require('../Controllers/chartHistoryController');
const { verifyToken } = require('../Controllers/authController');


const storage = multer.memoryStorage();
const upload = multer({ storage });

// Save chart history and file (protected)
router.post('/', verifyToken, upload.single('excelFile'), chartHistoryController.saveChartHistory);
// Get chart history for logged-in user (protected)
router.get('/', verifyToken, chartHistoryController.getChartHistory);
// Delete chart history by id (protected)
router.delete('/:id', verifyToken, chartHistoryController.deleteChartHistory);

// to get name
 router.get('/name', verifyToken, chartHistoryController.getname);

module.exports = router;
