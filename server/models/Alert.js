const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  dob: { type: Date, required: true },
  cellphone: { type: String, required: true },
  email: { type: String, required: true },
  location: {
    latitude: Number,
    longitude: Number,
  },
  audioUrl: String,
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Alert', alertSchema);
