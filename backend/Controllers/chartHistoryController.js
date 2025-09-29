const ChartHistory = require('../models/chartHistory');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const chartHistory = require('../models/chartHistory');

// Save chart history and file
exports.saveChartHistory = async (req, res) => {
  try {
    const { fileName, chartType, chartTitle, labels, values, xAxis, yAxis } = req.body;
    const userId = req.user ? req.user.id : null;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    let filePath = '';
    if (req.file) {
      // Save file to uploads folder
      const uploadsDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
      filePath = path.join(uploadsDir, req.file.originalname);
      fs.writeFileSync(filePath, req.file.buffer);
    }
    const chartHistory = new ChartHistory({
      user: userId,
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
  // Only show charts for the logged-in user
  // console.log("User from token:", req.user);
  const userId = req.user ? req.user.id : null;
  // console.log("User ID:", userId);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const history = await ChartHistory.find({ user: userId }).sort({ createdAt: -1 });
  // console.log("Fetched chart history:", history);
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


exports.getname = async (req, res) => {
  try {
  // Only show charts for the logged-in user
  // console.log("User from token:", req.user);
  const userId = req.user ? req.user._id : null;
  // console.log("User ID:", userId);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const namee = await User.find({ user: userId }).sort({ createdAt: -1 });
  console.log("Name:", namee);
  res.json(namee);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Details.' });
  }
};