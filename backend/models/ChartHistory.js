// models/ChartHistory.js
const mongoose = require('mongoose');

const chartHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: String,
  xAxis: String,
  yAxis: String,
  chartType: String,
  labels: [String],
  values: [Number],
  chartTitle: String,
  summary: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChartHistory', chartHistorySchema);
