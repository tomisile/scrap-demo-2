// server/routes/cv.js
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const router = express.Router();

// Middleware to check authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // In a real app, you'd verify the token here
  // For demo purposes, we'll just check if it exists
  if (!token.startsWith('token_') && token !== 'mock_token_123') {
    return res.status(403).json({ error: 'Invalid token' });
  }

  next();
};

// Process video for face recognition
router.post('/process', authenticateToken, async (req, res) => {
  const { video } = req.body;

  try {
    // For demo, return mock results
    // In production, you would call the Python script here
    const mockResult = generateMockResult(video);
    
    // Simulate processing delay
    setTimeout(() => {
      res.json(mockResult);
    }, 500);

  } catch (error) {
    console.error('CV processing error:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

// Function to call Python script (for when you integrate your actual CV model)
function callPythonScript(videoPath) {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(__dirname, '../scripts/process_video.py');
    const pythonProcess = spawn('python', [pythonScript, videoPath]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const parsedResult = JSON.parse(result);
          resolve(parsedResult);
        } catch (parseError) {
          reject(new Error('Failed to parse Python script output'));
        }
      } else {
        reject(new Error(`Python script failed: ${error}`));
      }
    });
  });
}

// Generate mock results for demo
function generateMockResult(videoName) {
  const peopleNames = ['John Doe', 'Jane Smith', 'Unknown Person', 'Security Guard', 'Visitor'];
  const numFaces = Math.floor(Math.random() * 4); // 0-3 faces
  const faces = [];

  for (let i = 0; i < numFaces; i++) {
    faces.push({
      label: peopleNames[Math.floor(Math.random() * peopleNames.length)],
      box: [
        Math.floor(Math.random() * 200), // x
        Math.floor(Math.random() * 150), // y
        80 + Math.floor(Math.random() * 40), // width
        80 + Math.floor(Math.random() * 40), // height
      ],
      confidence: 0.7 + Math.random() * 0.3, // 0.7 to 1.0
    });
  }

  return {
    video: videoName,
    faces,
    timestamp: new Date().toISOString(),
  };
}

module.exports = router;