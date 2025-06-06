// src/components/Dashboard/AlgorithmControls.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, BrainCircuit } from 'lucide-react';

interface AlgorithmControlsProps {
    activeAlgorithms: { [key: string]: boolean };
    onAlgorithmToggle: (algorithm: string, enabled: boolean) => void;
}

const AlgorithmControls: React.FC<AlgorithmControlsProps> = ({
    activeAlgorithms,
    onAlgorithmToggle
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const algorithms = [
        { key: 'faceDetection', label: 'Face Detection' },
        { key: 'blacklistMonitoring', label: 'Blacklist Monitoring' },
        { key: 'weaponsDetection', label: 'Weapons Detection' },
        { key: 'intentDetection', label: 'Intent Detection' },
        { key: 'privacyMasking', label: 'Privacy Masking' },
        { key: 'insiderThreat', label: 'Insider Threat Detection' }
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const activeCount = Object.values(activeAlgorithms).filter(Boolean).length;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors"
            >
                <BrainCircuit className="w-4 h-4 mr-2" />
                Algorithms ({activeCount})
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                    <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-300 mb-3">
                            Detection Algorithms
                        </h3>
                        <div className="space-y-3">
                            {algorithms.map(algorithm => (
                                <label
                                    key={algorithm.key}
                                    className="flex items-center justify-between cursor-pointer"
                                >
                                    <span className="text-sm text-white">
                                        {algorithm.label}
                                    </span>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={activeAlgorithms[algorithm.key] || false}
                                            onChange={(e) => onAlgorithmToggle(algorithm.key, e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`w-10 h-5 rounded-full transition-colors ${
                                                activeAlgorithms[algorithm.key] 
                                                    ? 'bg-blue-600' 
                                                    : 'bg-gray-600'
                                            }`}
                                        >
                                            <div
                                                className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                                                    activeAlgorithms[algorithm.key] 
                                                        ? 'translate-x-5' 
                                                        : 'translate-x-0.5'
                                                } mt-0.5`}
                                            />
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlgorithmControls;