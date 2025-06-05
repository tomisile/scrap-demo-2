# TELETRAAN Security Demo

A comprehensive security surveillance demo application featuring AI-powered facial recognition capabilities.

## Features

- **Authentication System**: Login/signup with Google OAuth integration
- **Real-time Video Monitoring**: 8-camera grid display with HTML5 video controls
- **AI-Powered Facial Recognition**: Toggle-based face detection with bounding boxes
- **Activity Logging**: Real-time log display of detection events
- **Modern UI**: Dark-themed interface built with React and Tailwind CSS

## Architecture

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Computer Vision**: Python integration (ArcFace model ready)
- **Authentication**: Mock OAuth + JWT tokens

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8+ (for CV integration)
- npm or yarn

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start the server
npm run dev
```

The backend will run on `http://localhost:3001`

### 3. Video Assets

Create the following directory structure and add your MP4 videos:
src/assets/videos/
├── video1.mp4
├── video2.mp4
├── video3.mp4
├── video4.mp4
├── video5.mp4
├── video6.mp4
├── video7.mp4
└── video8.mp4

**Note**: For demo purposes, you can use any MP4 files. Ensure they are reasonably sized for web playback.

### 4. Python CV Integration (Optional)

The application includes a mock Python script for computer vision processing. To integrate your actual ArcFace model:

1. Replace `server/scripts/process_video.py` with your actual CV script
2. Ensure your Python environment has the required dependencies
3. Update the `callPythonScript` function in `server/routes/cv.js`

## Usage

1. **Login**: Use the demo credentials or Google OAuth (mocked)
2. **Dashboard**: View the 8-camera grid
3. **Facial Recognition**: Toggle the switches below each video to enable/disable AI processing
4. **Monitoring**: Watch the activity log for detection events

## Demo Credentials

- Email: `demo@teletraan.com`
- Password: `demo123`

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration

### Computer Vision
- `POST /api/cv/process` - Process video for face recognition

## Containerization Suggestions

For your actual ArcFace model integration, consider:

1. **Docker Compose Setup**:
   - Frontend container (Node.js)
   - Backend container (Node.js)
   - CV Processing container (Python + your model)

2. **Microservices Architecture**:
   - Separate CV service with REST API
   - Message queue for async processing
   - Shared volume for video files

3. **Model Serving**:
   - Use TensorFlow Serving or TorchServe
   - GPU support with NVIDIA Docker
   - Model versioning and A/B testing

## Development Notes

- The application uses mock data for demonstration
- Facial recognition results are simulated
- Google OAuth is mocked (no actual Google integration)
- No database persistence (in-memory storage)

## Production Considerations

For a production deployment, implement:

- Real authentication with secure token management
- Database integration for user management and logs
- Actual Google OAuth configuration
- Video streaming optimization
- Error handling and logging
- Security headers and CORS configuration
- Rate limiting and input validation

## Troubleshooting

### Common Issues

1. **Videos not loading**: Ensure MP4 files are in `src/assets/videos/`
2. **Backend connection failed**: Check if server is running on port 3001
3. **Canvas overlay issues**: Verify video dimensions and canvas sizing

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This is a demo application for TELETRAAN security systems.