// src/components/Dashboard/VideoGrid.tsx
import React, { useRef, useEffect, useState } from 'react';

interface VideoGridProps {
    onLogUpdate: (message: string) => void;
    onVideoSelect: (videoIndex: number) => void;
    activeAlgorithms: { [key: string]: boolean };
}

const VideoGrid: React.FC<VideoGridProps> = ({ 
    onLogUpdate, 
    onVideoSelect, 
    activeAlgorithms 
}) => {
    const [detectionResults, setDetectionResults] = useState<{[key: number]: any}>({});
    const [websockets, setWebsockets] = useState<{[key: number]: WebSocket}>({});
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

    // Start/stop CV processing based on algorithms
    useEffect(() => {
        const hasActiveAlgorithms = Object.values(activeAlgorithms).some(Boolean);
        
        for (let i = 0; i < 8; i++) {
            const videoSource = `video${i + 1}.mp4`;
            
            if (hasActiveAlgorithms) {
                startCVProcessing(i, videoSource);
                setupWebSocket(i, videoSource);
            } else {
                stopCVProcessing(i, videoSource);
                closeWebSocket(i);
            }
        }
    }, [activeAlgorithms]);

    const startCVProcessing = async (videoIndex: number, videoSource: string) => {
        try {
            const response = await fetch('/api/cv/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({
                    videoSource,
                    algorithms: activeAlgorithms
                })
            });
            
            if (response.ok) {
                onLogUpdate(`Started CV processing for Camera ${videoIndex + 1}`);
            }
        } catch (error) {
            console.error('Failed to start CV processing:', error);
        }
    };

    const stopCVProcessing = async (videoIndex: number, videoSource: string) => {
        try {
            await fetch('/api/cv/stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({ videoSource })
            });
            
            onLogUpdate(`Stopped CV processing for Camera ${videoIndex + 1}`);
        } catch (error) {
            console.error('Failed to stop CV processing:', error);
        }
    };

    const setupWebSocket = (videoIndex: number, videoSource: string) => {
        const ws = new WebSocket(`ws://localhost:3001/api/cv/detections/${videoSource}`);
        
        ws.onmessage = (event) => {
            const detection = JSON.parse(event.data);
            
            setDetectionResults(prev => ({
                ...prev,
                [videoIndex]: detection
            }));
            
            onLogUpdate(
                `Camera ${videoIndex + 1}: Detected ${detection.person_name} ` +
                `(${(detection.confidence * 100).toFixed(1)}%)`
            );
            
            drawDetection(videoIndex, detection);
        };
        
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        
        setWebsockets(prev => ({
            ...prev,
            [videoIndex]: ws
        }));
    };

    const closeWebSocket = (videoIndex: number) => {
        const ws = websockets[videoIndex];
        if (ws) {
            ws.close();
            setWebsockets(prev => {
                const newWs = { ...prev };
                delete newWs[videoIndex];
                return newWs;
            });
        }
    };

    const drawDetection = (videoIndex: number, detection: any) => {
        const canvas = canvasRefs.current[videoIndex];
        if (!canvas || !detection.bounding_box) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const [x, y, width, height] = detection.bounding_box;
        
        // Draw bounding box
        ctx.strokeStyle = detection.alert_level === 'high' ? '#ff4444' : '#4A90E2';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        // Draw label
        ctx.fillStyle = detection.alert_level === 'high' ? 'rgba(255, 68, 68, 0.8)' : 'rgba(74, 144, 226, 0.8)';
        ctx.fillRect(x, y - 25, width, 25);

        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.fillText(
            `${detection.person_name} (${(detection.confidence * 100).toFixed(1)}%)`,
            x + 5,
            y - 8
        );
    };

    // Rest of your component remains the same...
    return (
        <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, index) => (
                <div 
                    key={index} 
                    className="bg-gray-800 overflow-hidden cursor-pointer hover:ring-2 hover:ring-gray-700 transition-all"
                    onClick={() => onVideoSelect(index)}
                >
                    <div className="relative">
                        <video
                            ref={(el) => { videoRefs.current[index] = el; }}
                            className="w-full h-48 object-cover"
                            loop
                            muted
                            autoPlay
                        >
                            <source src={`/videos/video${index + 1}.mp4`} type="video/mp4" />
                        </video>
                        <canvas
                            ref={(el) => { canvasRefs.current[index] = el; }}
                            className="absolute top-0 left-0 pointer-events-none"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                    <div className="p-4">
                        <span className="text-gray-500 text-xs font-medium">
                            Camera {index + 1}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideoGrid;