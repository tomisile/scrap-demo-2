import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import VideoGrid from './VideoGrid';
import LogSection from './LogSection';
import { Inbox } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleLogUpdate = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleLogout = () => {
    // Clear any stored auth data
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
            <h1 className="text-2xl font-medium text-white">Recorded Footage</h1>
            <div className="flex items-center space-x-4">
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
            <VideoGrid onLogUpdate={handleLogUpdate} />
            <LogSection logs={logs} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;