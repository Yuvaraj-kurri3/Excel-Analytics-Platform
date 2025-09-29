const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ChartHistory = require('../models/chartHistory');
const { verifyToken } = require('../Controllers/authController');
const isAdmin = require('../middleware/Isadmin');

// Get all users
router.get('/users', verifyToken, isAdmin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Get all chart history
router.get('/charts', verifyToken, isAdmin, async (req, res) => {
  const charts = await ChartHistory.find().populate('userEmail');
  res.json(charts);
});

// Delete user
router.delete('/users/:id', verifyToken, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Delete chart
router.delete('/charts/:id', verifyToken, isAdmin, async (req, res) => {
  await ChartHistory.findByIdAndDelete(req.params.id);
  res.json({ message: 'Chart deleted' });
});

module.exports = router;
// End of recent edits