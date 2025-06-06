// src/components/Dashboard/DashboardPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import VideoGrid from './VideoGrid';
import FullScreenVideo from './FullScreenVideo';
import LogSection from './LogSection';
import AlgorithmControls from './AlgorithmControls';
import { Inbox } from 'lucide-react';

const DashboardPage: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
    const [activeAlgorithms, setActiveAlgorithms] = useState<{ [key: string]: boolean }>({
        faceDetection: false,
        blacklistMonitoring: false,
        weaponsDetection: false,
        intentDetection: false,
        privacyMasking: false,
        insiderThreat: false
    });
    const navigate = useNavigate();

    const handleLogUpdate = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    };

    const handleVideoSelect = (videoIndex: number) => {
        setSelectedVideo(videoIndex);
    };

    const handleBackToGrid = () => {
        setSelectedVideo(null);
    };

    const handleAlgorithmToggle = (algorithm: string, enabled: boolean) => {
        setActiveAlgorithms(prev => ({
            ...prev,
            [algorithm]: enabled
        }));

        const action = enabled ? 'enabled' : 'disabled';
        const algorithmName = algorithm.replace(/([A-Z])/g, ' $1').toLowerCase();
        handleLogUpdate(`${algorithmName.charAt(0).toUpperCase() + algorithmName.slice(1)} ${action}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-900">
            <Sidebar onLogout={handleLogout} />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-gray-900 border-b-2 border-gray-800 px-6 py-4 pt-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-medium text-white">
                            {selectedVideo !== null ? 'Video Playback' : 'Recorded Footage'}
                        </h1>
                        <div className="flex items-center space-x-4">
                            <AlgorithmControls
                                activeAlgorithms={activeAlgorithms}
                                onAlgorithmToggle={handleAlgorithmToggle}
                            />
                            <button className="p-2 text-gray-400 hover:text-white">
                                <Inbox className="w-6 h-6" />
                            </button>
                            <div className="flex items-center space-x-2">
                                <button className='flex items-center'>
                                    <div className="w-8 h-8 bg-gray-600 flex items-center justify-center">
                                        <span className="text-sm font-medium text-white">TO</span>
                                    </div>
                                    <span className="text-white text-sm pl-2">tomioluwasile@gmail.com</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-6">
                    <div className="space-y-6">
                        {selectedVideo !== null ? (
                            <FullScreenVideo
                                videoIndex={selectedVideo}
                                onBack={handleBackToGrid}
                                onLogUpdate={handleLogUpdate}
                                activeAlgorithms={activeAlgorithms}
                            />
                        ) : (
                            <VideoGrid
                                onLogUpdate={handleLogUpdate}
                                onVideoSelect={handleVideoSelect}
                                activeAlgorithms={activeAlgorithms}
                            />
                        )}
                        <LogSection logs={logs} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;