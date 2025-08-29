const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

router.post('/trigger', async (req, res) => {
  const { userId, location, audioUrl } = req.body;

  console.log('🚨 ALERT received:');
  console.log(`👤 User ID: ${userId}`);
  if (location?.latitude && location?.longitude) {
    console.log(`📍 Location: Lat ${location.latitude}, Long ${location.longitude}`);
  } else {
    console.log('📍 Location not provided');
  }

  try {
    const alert = new Alert({
      userId,
      location,
      audioUrl: audioUrl || '', // optional audio URL
    });

    await alert.save();

    res.status(200).json({ message: 'Alert received and saved successfully', data: alert });
  } catch (err) {
    console.error('❌ Error saving alert:', err);
    res.status(500).json({ message: 'Failed to save alert', error: err.message });
  }
});

module.exports = router;




