// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // create this model next

// POST /api/users/register
router.post('/register', async (req, res) => {
  const { name, surname, dob, cellphone, email } = req.body;

  if (!name || !surname || !dob || !cellphone || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newUser = new User({
      name,
      surname,
      dob,
      cellphone,
      email,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (err) {
    console.error('❌ Error registering user:', err);
    res.status(500).json({ message: 'Failed to register user', error: err.message });
  }
});

module.exports = router;
