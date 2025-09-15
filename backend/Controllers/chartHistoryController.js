const ChartHistory = require('../models/chartHistory');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const chartHistory = require('../models/chartHistory');

// Save chart history and file
exports.saveChartHistory = async (req, res) => {
  try {
    const { email, fileName, chartType, chartTitle, labels, values, xAxis, yAxis } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });
    let filePath = '';
    if (req.file) {
      // Save file to uploads folder
      const uploadsDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
      filePath = path.join(uploadsDir, req.file.originalname);
      fs.writeFileSync(filePath, req.file.buffer);
    }
    const chartHistory = new ChartHistory({
      user: user._id,
      fileName,
      chartType,
      chartTitle,
      labels,
      values,
      xAxis,
      yAxis,
      filePath,
    });
    await chartHistory.save();
    res.status(201).json(chartHistory);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save chart history.' });
  }
};

// Get chart history by email
exports.getChartHistory = async (req, res) => {
  try {
    const { email } = req.params;
    // console.log("Fetching chart history for email:", email);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });
    const history = await ChartHistory.find({ user: user._id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chart history.' });
  }
};

// Delete chart history by id
exports.deleteChartHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await ChartHistory.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete chart history.' });
  }
};
