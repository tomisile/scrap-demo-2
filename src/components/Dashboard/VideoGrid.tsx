// src/components/Dashboard/VideoGrid.tsx
import React, { useRef, useEffect, useState } from 'react';
import { cvService } from '../../services/cvService.ts';

interface VideoGridProps {
    onLogUpdate: (message: string) => void;
    onVideoSelect: (videoIndex: number) => void;
    activeAlgorithms: { [key: string]: boolean };
}

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

const VideoGrid: React.FC<VideoGridProps> = ({ 
    onLogUpdate, 
    onVideoSelect, 
    activeAlgorithms 
}) => {
    const [detectionResults, setDetectionResults] = useState<{
        [key: number]: CVResult;
    }>({});
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
    const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([]);

    const handleVideoClick = (index: number) => {
        onVideoSelect(index);
    };

    const startProcessing = async (videoIndex: number) => {
        const processVideo = async () => {
            try {
                const result = await cvService.processVideo(
                    `video${videoIndex + 1}.mp4`,
                    activeAlgorithms
                );
                setDetectionResults(prev => ({
                    ...prev,
                    [videoIndex]: result
                }));

                if (result.faces.length > 0) {
                    const faceLabels = result.faces.map(face => face.label).join(', ');
                    onLogUpdate(
                        `Video ${videoIndex + 1}: Detected ${faceLabels} at ${result.timestamp}`
                    );
                }

                drawDetections(videoIndex, result.faces);
            } catch (error) {
                console.error(`Error processing video ${videoIndex + 1}:`, error);
            }
        };

        if (Object.values(activeAlgorithms).some(active => active)) {
            await processVideo();
            intervalRefs.current[videoIndex] = setInterval(processVideo, 5000);
        }
    };

    const stopProcessing = (videoIndex: number) => {
        if (intervalRefs.current[videoIndex]) {
            clearInterval(intervalRefs.current[videoIndex]);
            intervalRefs.current[videoIndex] = null;
        }

        const canvas = canvasRefs.current[videoIndex];
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    const drawDetections = (videoIndex: number, faces: FaceDetection[]) => {
        const canvas = canvasRefs.current[videoIndex];
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        faces.forEach(face => {
            const [x, y, width, height] = face.box;
            ctx.strokeStyle = '#4A90E2';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);

            ctx.fillStyle = 'rgba(74, 144, 226, 0.8)';
            ctx.fillRect(x, y - 25, width, 25);

            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText(
                `${face.label} (${(face.confidence * 100).toFixed(1)}%)`,
                x + 5,
                y - 8
            );
        });
    };

    const updateCanvasSize = (videoIndex: number) => {
        const video = videoRefs.current[videoIndex];
        const canvas = canvasRefs.current[videoIndex];

        if (video && canvas) {
            canvas.width = video.offsetWidth;
            canvas.height = video.offsetHeight;
        }
    };

    useEffect(() => {
        // Start/stop processing based on active algorithms
        for (let i = 0; i < 8; i++) {
            if (Object.values(activeAlgorithms).some(active => active)) {
                startProcessing(i);
            } else {
                stopProcessing(i);
            }
        }

        return () => {
            intervalRefs.current.forEach(interval => {
                if (interval) clearInterval(interval);
            });
        };
    }, [activeAlgorithms]);

    return (
        <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, index) => (
                <div 
                    key={index} 
                    className="bg-gray-800 overflow-hidden cursor-pointer hover:ring-2 hover:ring-gray-700 transition-all"
                    onClick={() => handleVideoClick(index)}
                >
                    <div className="relative">
                        <video
                            ref={(el) => {
                                videoRefs.current[index] = el;
                            }}
                            className="w-full h-48 object-cover"
                            loop
                            muted
                            autoPlay
                            onLoadedMetadata={() => updateCanvasSize(index)}
                            onResize={() => updateCanvasSize(index)}
                        >
                            <source
                                src={`/videos/video${index + 1}.mp4`}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                        <canvas
                            ref={(el) => {
                                canvasRefs.current[index] = el;
                            }}
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