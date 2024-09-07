const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register a user
router.post('/register', async (req, res) => {
    const { address, email, name, password, plants, telephone, userType } = req.body;
    try {
      const user = new User({ email, password, name, address, userType, telephone, plants });
      await user.save();
      console.log('User registered successfully:', user);
      res.status(201).json({
        message: 'User registered successfully!',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          address: user.address,
          userType: user.userType,
          telephone: user.telephone,
          plants: user.plants
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: error.message });
    }
  });
  

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, "helloooo", { expiresIn: '1h' });
    res.json({
      token: token,
      user: {
        id: user._id,
        name: user.name,
        userType: user.userType
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit user
router.put('/edit/:id', async (req, res) => {
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            id: user._id,
            email: user.email,
            name: user.name,
            address: user.address,
            userType: user.userType,
            telephone: user.telephone,
            plants: user.plants
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
