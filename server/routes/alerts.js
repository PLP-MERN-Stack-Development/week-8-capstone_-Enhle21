const express = require('express');
const router = express.Router();
const { createAlert } = require('../controllers/alertController');
const auth = require('../middleware/auth');

router.post('/create', auth, createAlert);

module.exports = router;