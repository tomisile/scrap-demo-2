// src/components/Dashboard/VideoGrid.tsx
import React, { useRef, useEffect, useState } from 'react';
import { cvService } from '../../services/cvService.ts';

interface VideoGridProps {
    onLogUpdate: (message: string) => void;
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

const VideoGrid: React.FC<VideoGridProps> = ({ onLogUpdate }) => {
    const [toggleStates, setToggleStates] = useState<boolean[]>(
        new Array(8).fill(false)
    );
    const [detectionResults, setDetectionResults] = useState<{
        [key: number]: CVResult;
    }>({});
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
    const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([]);

    const handleToggle = async (index: number) => {
        const newStates = [...toggleStates];
        newStates[index] = !newStates[index];
        setToggleStates(newStates);

        if (newStates[index]) {
            // Start facial recognition
            onLogUpdate(`Video ${index + 1}: Facial recognition enabled`);
            startFacialRecognition(index);
        } else {
            // Stop facial recognition
            onLogUpdate(`Video ${index + 1}: Facial recognition disabled`);
            stopFacialRecognition(index);
        }
    };

    const startFacialRecognition = async (videoIndex: number) => {
        const processVideo = async () => {
            try {
                const result = await cvService.processVideo(`video${videoIndex + 1}.mp4`);
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
                onLogUpdate(`Video ${videoIndex + 1}: Processing error`);
            }
        };

        // Process immediately and then every 5 seconds
        await processVideo();
        intervalRefs.current[videoIndex] = setInterval(processVideo, 5000);
    };

    const stopFacialRecognition = (videoIndex: number) => {
        if (intervalRefs.current[videoIndex]) {
            clearInterval(intervalRefs.current[videoIndex]);
            intervalRefs.current[videoIndex] = null;
        }

        // Clear canvas
        const canvas = canvasRefs.current[videoIndex];
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        // Remove detection results
        setDetectionResults(prev => {
            const newResults = { ...prev };
            delete newResults[videoIndex];
            return newResults;
        });
    };

    const drawDetections = (videoIndex: number, faces: FaceDetection[]) => {
        const canvas = canvasRefs.current[videoIndex];
        const video = videoRefs.current[videoIndex];

        if (!canvas || !video) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw bounding boxes and labels
        faces.forEach(face => {
            const [x, y, width, height] = face.box;

            // Draw bounding box
            ctx.strokeStyle = '#4A90E2';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);

            // Draw label background
            ctx.fillStyle = 'rgba(74, 144, 226, 0.8)';
            ctx.fillRect(x, y - 25, width, 25);

            // Draw label text
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
        // Cleanup intervals on unmount
        return () => {
            intervalRefs.current.forEach(interval => {
                if (interval) clearInterval(interval);
            });
        };
    }, []);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }, (_, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                        <div className="relative">
                            <video
                                // ref={el => videoRefs.current[index] = el}
                                ref={(el) => {
                                    videoRefs.current[index] = el;
                                }}
                                className="w-full h-48 object-cover"
                                controls
                                loop
                                muted
                                autoPlay
                                onLoadedMetadata={() => updateCanvasSize(index)}
                                onResize={() => updateCanvasSize(index)}
                            >
                                <source
                                    src={`/src/assets/videos/video${index + 1}.mp4`}
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                            <canvas
                                // ref={el => canvasRefs.current[index] = el}
                                ref={(el) => {
                                    canvasRefs.current[index] = el;
                                }}
                                className="absolute top-0 left-0 pointer-events-none"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-white text-sm font-medium">
                                    Camera {index + 1}
                                </span>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={toggleStates[index]}
                                        onChange={() => handleToggle(index)}
                                        className="sr-only"
                                    />
                                    <div
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${toggleStates[index] ? 'bg-blue-600' : 'bg-gray-600'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggleStates[index] ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </div>
                                    <span className="ml-2 text-sm text-gray-300">
                                        Facial Recognition
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoGrid;