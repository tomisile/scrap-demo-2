// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const cvRoutes = require('./routes/cv');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TELETRAAN API is running' });
});

app.listen(PORT, () => {
  console.log(`TELETRAAN server running on port ${PORT}`);
});