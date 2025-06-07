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
    private baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

    async startProcessing(videoSource: string, algorithms: { [key: string]: boolean }): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/cv/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({ 
                    videoSource,
                    algorithms
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to start CV processing');
            }

            return await response.json();
        } catch (error) {
            console.error('CV start error:', error);
            throw error;
        }
    }

    async stopProcessing(videoSource: string): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/cv/stop`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({ videoSource }),
            });

            if (!response.ok) {
                throw new Error('Failed to stop CV processing');
            }

            return await response.json();
        } catch (error) {
            console.error('CV stop error:', error);
            throw error;
        }
    }

    async getDetections(videoSource: string): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/cv/detections/${videoSource}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to get detections');
            }

            return await response.json();
        } catch (error) {
            console.error('CV detections error:', error);
            return null;
        }
    }

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