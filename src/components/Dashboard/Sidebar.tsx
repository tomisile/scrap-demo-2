import React from 'react';
import { Camera, Video, Shield, FileText, Lock, Users, Settings, Smartphone, LogOut } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const menuItems = [
    { icon: '📹', label: 'Security Cameras', active: false },
    { icon: '📼', label: 'Recorded Footage', active: true },
    { icon: '🚨', label: 'Security Alerts', active: false },
    { icon: '📋', label: 'Alert Log', active: false },
    { icon: '🔐', label: 'Manage Access', active: false },
    { icon: '👥', label: 'User & Roles', active: false },
    { icon: '⚙️', label: 'System Settings', active: false },
    { icon: '📱', label: 'Device Management', active: false },
  ];

  return (
    <div className="teletraan-sidebar h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="teletraan-logo">TELETRAAN</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="mb-6">
          <h3 className=" mb-3 teletraan-section-label">
            Surveillance
          </h3>
          <ul className="space-y-2">
            {menuItems.slice(0, 2).map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-3 py-2 teletraan-menu-item ${
                    item.active ? 'active' : ''
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
          <h3 className=" mb-3 teletraan-section-label">
            Alerts & Logs
          </h3>
          <ul className="space-y-2">
            {menuItems.slice(2, 4).map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-3 py-2 teletraan-menu-item ${
                    item.active ? 'active' : ''
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
          <h3 className=" mb-3 teletraan-section-label">
            Access Control
          </h3>
          <ul className="space-y-2">
            {menuItems.slice(4, 6).map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-3 py-2 teletraan-menu-item ${
                    item.active ? 'active' : ''
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
          <h3 className=" mb-3 teletraan-section-label">
            Settings
          </h3>
          <ul className="space-y-2">
            {menuItems.slice(6, 8).map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-3 py-2 teletraan-menu-item ${
                    item.active ? 'active' : ''
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
      <div className="p-4 teletraan-promo">
        <div className="bg-gray-700 p-4 mb-4">
          <h4 className="teletraan-promo-title">New to Teletraan?</h4>
          <p className="teletraan-promo-desc">
            A brief tour will guide you through the essentials
          </p>
          <div className="flex space-x-2">
            <button className="teletraan-button-secondary">
              Not Now
            </button>
            <button className="teletraan-button-primary">
              Start Tour
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center w-full px-3 py-2 teletraan-menu-item"
        >
          <span className="mr-3">🚪</span>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;