// server/routes/auth.js
const express = require('express');
const router = express.Router();

// Mock user database
const users = [
  {
    id: '1',
    email: 'demo@teletraan.com',
    password: 'demo123', // In real app, this would be hashed
    name: 'Demo User'
  }
];

// Sign in
router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate mock token
  const token = `token_${user.id}_${Date.now()}`;

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

// Sign up
router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Create new user
  const newUser = {
    id: String(users.length + 1),
    email,
    password, // In real app, this would be hashed
    name: email.split('@')[0] // Use email prefix as name
  };

  users.push(newUser);

  // Generate mock token
  const token = `token_${newUser.id}_${Date.now()}`;

  res.json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  });
});

module.exports = router;