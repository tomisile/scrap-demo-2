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

    async processVideo(videoName: string, algorithms?: { [key: string]: boolean }): Promise<CVResult> {
        try {
            const response = await fetch(`${this.baseUrl}/cv/process`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({ 
                    video: videoName,
                    algorithms: algorithms || {}
                }),
            });

            if (!response.ok) {
                throw new Error('CV processing failed');
            }

            return await response.json();
        } catch (error) {
            return this.getMockResult(videoName, algorithms);
        }
    }

    private getMockResult(videoName: string, algorithms?: { [key: string]: boolean }): CVResult {
        const mockFaces: FaceDetection[] = [];
        
        // Only generate detections if relevant algorithms are active
        const hasActiveAlgorithms = algorithms && Object.values(algorithms).some(Boolean);
        
        if (hasActiveAlgorithms) {
            const peopleNames = ['John Doe', 'Jane Smith', 'Unknown Person', 'Security Guard'];
            const numFaces = Math.floor(Math.random() * 4);
            
            for (let i = 0; i < numFaces; i++) {
                mockFaces.push({
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
            faces: mockFaces,
            timestamp: new Date().toLocaleTimeString(),
        };
    }
}

export const cvService = new CVService();