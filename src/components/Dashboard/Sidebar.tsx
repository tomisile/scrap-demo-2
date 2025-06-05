// src/components/Dashboard/Sidebar.tsx
import React from 'react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const menuItems = [
    { icon: '📹', label: 'Security Cameras', active: true },
    { icon: '📼', label: 'Recorded Footage', active: false },
    { icon: '🚨', label: 'Security Alerts', active: false },
    { icon: '📋', label: 'Alert Log', active: false },
    { icon: '🔐', label: 'Manage Access', active: false },
    { icon: '👥', label: 'User & Roles', active: false },
    { icon: '⚙️', label: 'System Settings', active: false },
    { icon: '📱', label: 'Device Management', active: false },
  ];

  return (
    <div className="w-64 bg-gray-800 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">TELETRAAN</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Surveillance
          </h3>
          <ul className="space-y-2">
            {menuItems.slice(0, 2).map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    item.active
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Alerts & Logs
          </h3>
          <ul className="space-y-2">
            {menuItems.slice(2, 4).map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    item.active
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Access Control
          </h3>
          <ul className="space-y-2">
            {menuItems.slice(4, 6).map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    item.active
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Settings
          </h3>
          <ul className="space-y-2">
            {menuItems.slice(6, 8).map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    item.active
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Onboarding Section */}
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-white mb-2">New to Teletraan?</h4>
          <p className="text-xs text-gray-300 mb-3">
            A brief tour will guide you through the essentials
          </p>
          <div className="flex space-x-2">
            <button className="text-xs text-gray-400 hover:text-white">
              Not Now
            </button>
            <button className="text-xs bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded">
              Start Tour
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <span className="mr-3">🚪</span>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;