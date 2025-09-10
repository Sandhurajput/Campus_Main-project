// src/routes/userRoutes.js
const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Create user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body); // expects {name, email}
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

module.exports = router;
