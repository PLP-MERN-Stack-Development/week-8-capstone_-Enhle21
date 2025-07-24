// routes/alerts.js
const express = require('express');
const router = express.Router();

// Temporary test data route
router.get('/', (req, res) => {
  res.json([
    { id: 1, message: 'Emergency Alert near Joburg' },
    { id: 2, message: 'Suspicious activity in Pretoria' },
  ]);
});

module.exports = router;
