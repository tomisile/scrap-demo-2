// src/server/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const passport = require('../config/passport');
const passport = require('passport');

const router = express.Router();

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    try {
      // Successful authentication
      const token = jwt.sign(
        {
          id: req.user.id,
          email: req.user.email,
          name: req.user.name
        },
        process.env.JWT_SECRET || 'your-jwt-secret',
        { expiresIn: '24h' }
      );

      // Redirect to frontend with token
      res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
    } catch (error) {
      console.error('Token generation failed:', error);
      res.redirect('http://localhost:5173/?error=token_failed');
    }
  }
);

// Traditional email/password routes
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // In a real app, verify credentials against database
    // For demo, we'll accept any email/password
    const user = {
      id: '1',
      name: 'Demo User',
      email: email
    };

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: '24h' }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Sign in failed' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // In a real app, hash password and save to database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now().toString(),
      name: 'New User',
      email: email
    };

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: '24h' }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Sign up failed' });
  }
});

// Get current user
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;