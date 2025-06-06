// src/components/Dashboard/FullScreenVideo.tsx
import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { cvService } from '../../services/cvService';

interface FullScreenVideoProps {
    videoIndex: number;
    onBack: () => void;
    onLogUpdate: (message: string) => void;
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

const FullScreenVideo: React.FC<FullScreenVideoProps> = ({
    videoIndex,
    onBack,
    onLogUpdate,
    activeAlgorithms
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [detectionResult, setDetectionResult] = useState<CVResult | null>(null);

    const startProcessing = async () => {
        const processVideo = async () => {
            try {
                const result = await cvService.processVideo(
                    `video${videoIndex + 1}.mp4`,
                    activeAlgorithms
                );
                setDetectionResult(result);

                if (result.faces.length > 0) {
                    const faceLabels = result.faces.map(face => face.label).join(', ');
                    onLogUpdate(
                        `Video ${videoIndex + 1}: Detected ${faceLabels} at ${result.timestamp}`
                    );
                }

                drawDetections(result.faces);
            } catch (error) {
                console.error(`Error processing video ${videoIndex + 1}:`, error);
            }
        };

        if (Object.values(activeAlgorithms).some(active => active)) {
            await processVideo();
            intervalRef.current = setInterval(processVideo, 5000);
        }
    };

    const drawDetections = (faces: FaceDetection[]) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        faces.forEach(face => {
            const [x, y, width, height] = face.box;
            ctx.strokeStyle = '#4A90E2';
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, width, height);

            ctx.fillStyle = 'rgba(74, 144, 226, 0.8)';
            ctx.fillRect(x, y - 30, width, 30);

            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText(
                `${face.label} (${(face.confidence * 100).toFixed(1)}%)`,
                x + 8,
                y - 10
            );
        });
    };

    const updateCanvasSize = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            canvas.width = video.offsetWidth;
            canvas.height = video.offsetHeight;
        }
    };

    useEffect(() => {
        startProcessing();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [activeAlgorithms]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    All Footages
                </button>
                <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-medium text-white">
                        Camera {videoIndex + 1} - Full View
                    </h2>
                    <button className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Download Footage
                    </button>
                </div>
            </div>

            <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                    ref={videoRef}
                    className="w-full h-[600px] object-contain"
                    controls
                    loop
                    muted
                    autoPlay
                    onLoadedMetadata={updateCanvasSize}
                    onResize={updateCanvasSize}
                >
                    <source
                        src={`/videos/video${videoIndex + 1}.mp4`}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};

export default FullScreenVideo;