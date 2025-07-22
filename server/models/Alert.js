const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    latitude: Number,
    longitude: Number,
  },
  audioUrl: String,
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Alert', alertSchema);