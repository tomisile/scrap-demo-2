// src/services/cvService.ts
interface FaceDetection {
  label: string;
  box: [number, number, number, number];
  confidence: number;
}

interface CVResult {
  video: string;
  faces: FaceDetection[];
  timestamp: string;
}

class CVService {
  private baseUrl = 'http://localhost:3001/api';

  async processVideo(videoName: string): Promise<CVResult> {
    try {
      const response = await fetch(`${this.baseUrl}/cv/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ video: videoName }),
      });

      if (!response.ok) {
        throw new Error('CV processing failed');
      }

      return await response.json();
    } catch (error) {
      // Fallback to mock results for demo
      return this.getMockResult(videoName);
    }
  }

  private getMockResult(videoName: string): CVResult {
    const mockFaces: FaceDetection[] = [];
    const peopleNames = ['John Doe', 'Jane Smith', 'Unknown Person', 'Security Guard'];
    
    // Randomly generate 0-3 face detections
    const numFaces = Math.floor(Math.random() * 4);
    
    for (let i = 0; i < numFaces; i++) {
      mockFaces.push({
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
      faces: mockFaces,
      timestamp: new Date().toLocaleTimeString(),
    };
  }
}

export const cvService = new CVService();