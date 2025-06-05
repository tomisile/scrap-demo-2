// src/components/Dashboard/LogSection.tsx
import React, { useEffect, useRef } from 'react';

interface LogSectionProps {
  logs: string[];
}

const LogSection: React.FC<LogSectionProps> = ({ logs }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new logs are added
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-medium text-white mb-4">Activity Log</h3>
      <div
        ref={logContainerRef}
        className="h-40 overflow-y-auto bg-gray-900 rounded p-3 font-mono text-sm"
      >
        {logs.length === 0 ? (
          <p className="text-gray-500">No activity yet...</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="text-green-400 mb-1">
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogSection;