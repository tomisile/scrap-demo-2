// server/routes/cv.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const CV_SERVICE_URL = process.env.CV_SERVICE_URL || 'http://blacklist-monitor:8000';

// Middleware to check authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // For demo purposes, accept any valid JWT format
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      next();
    } else {
      return res.status(403).json({ error: 'Invalid token format' });
    }
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Start CV processing
router.post('/start', authenticateToken, async (req, res) => {
  const { videoSource, algorithms } = req.body;
  
  try {
    const response = await axios.post(`${CV_SERVICE_URL}/api/cv/start`, {
      video_source: videoSource,
      algorithms: algorithms
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('CV start error:', error);
    res.status(500).json({ error: 'Failed to start CV processing' });
  }
});

// Stop CV processing
router.post('/stop', authenticateToken, async (req, res) => {
  const { videoSource } = req.body;
  
  try {
    const response = await axios.post(`${CV_SERVICE_URL}/api/cv/stop`, {
      video_source: videoSource
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('CV stop error:', error);
    res.status(500).json({ error: 'Failed to stop CV processing' });
  }
});

// Get processing status
router.get('/status', authenticateToken, async (req, res) => {
  try {
    const response = await axios.get(`${CV_SERVICE_URL}/api/cv/status`);
    res.json(response.data);
  } catch (error) {
    console.error('CV status error:', error);
    res.status(500).json({ error: 'Failed to get CV status' });
  }
});

// Get latest detections (polling endpoint)
router.get('/detections/:videoSource', authenticateToken, async (req, res) => {
  const { videoSource } = req.params;
  
  try {
    const response = await axios.get(`${CV_SERVICE_URL}/api/cv/detections/${videoSource}`);
    res.json(response.data);
  } catch (error) {
    console.error('CV detections error:', error);
    res.status(500).json({ error: 'Failed to get detections' });
  }
});

// Legacy process endpoint for backward compatibility
router.post('/process', authenticateToken, async (req, res) => {
  const { video, algorithms } = req.body;

  try {
    // For demo, return mock results
    const mockResult = generateMockResult(video, algorithms);
    
    // Simulate processing delay
    setTimeout(() => {
      res.json(mockResult);
    }, 500);

  } catch (error) {
    console.error('CV processing error:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

// Generate mock results for demo
function generateMockResult(videoName, algorithms) {
  const peopleNames = ['John Doe', 'Jane Smith', 'Unknown Person', 'Security Guard', 'Visitor'];
  const numFaces = Math.floor(Math.random() * 4);
  const faces = [];

  // Only generate detections if algorithms are active
  const hasActiveAlgorithms = algorithms && Object.values(algorithms).some(Boolean);
  
  if (hasActiveAlgorithms) {
    for (let i = 0; i < numFaces; i++) {
      faces.push({
        label: peopleNames[Math.floor(Math.random() * peopleNames.length)],
        box: [
          Math.floor(Math.random() * 200),
          Math.floor(Math.random() * 150),
          80 + Math.floor(Math.random() * 40),
          80 + Math.floor(Math.random() * 40),
        ],
        confidence: 0.7 + Math.random() * 0.3,
      });
    }
  }

  return {
    video: videoName,
    faces,
    timestamp: new Date().toISOString(),
  };
}

module.exports = router;