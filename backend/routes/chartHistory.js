const express = require('express');
const router = express.Router();
const multer = require('multer');
const chartHistoryController = require('../Controllers/chartHistoryController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Save chart history and file
router.post('/', upload.single('excelFile'), chartHistoryController.saveChartHistory);
// Get chart history by email
router.get('/', chartHistoryController.getChartHistory);
// Delete chart history by id
router.delete('/:id', chartHistoryController.deleteChartHistory);

module.exports = router;
