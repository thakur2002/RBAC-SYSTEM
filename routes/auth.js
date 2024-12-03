const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Register
router.post('/signup', async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  } 
  username=username.trim();
  if(username.includes(' ')){
    return res.status(400).json({error: 'username should not contain spaces'});
  }
  username=username.charAt(0).toUpperCase() + username.slice(1);

  const existinguser = await User.findOne({ username:username});
  if(existinguser){
    return res.status(409).json({error:"username exists"});
    
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully!' });
});

// Login
router.post('/login', async (req, res) => {
  let { username, password } = req.body;
  username=username.trim();
  username=username.charAt(0).toUpperCase() + username.slice(1);
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });

  res.cookie('token', token, {
    httpOnly: true,       // Prevent JavaScript access to the cookie
    secure: process.env.NODE_ENV === 'production',        
    sameSite: 'None',   // Allowing for cross-origin cookie transfer
    maxAge: 7200000       // 2 hour expiration
  });
  res.status(201).json({ message: 'Login successful' });
});

module.exports = router;
