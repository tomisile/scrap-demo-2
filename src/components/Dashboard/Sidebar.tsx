import React from 'react';
import { Camera, Video, Shield, FileText, Lock, Users, Settings, Smartphone, LogOut } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const menuItems = [
    { icon: Camera, label: 'Security Cameras', active: false },
    { icon: Video, label: 'Recorded Footage', active: true },
    { icon: Shield, label: 'Security Alerts', active: false },
    { icon: FileText, label: 'Alert Log', active: false },
    { icon: Lock, label: 'Manage Access', active: false },
    { icon: Users, label: 'User & Roles', active: false },
    { icon: Settings, label: 'System Settings', active: false },
    { icon: Smartphone, label: 'Device Management', active: false },
  ];

  return (
    <div className="teletraan-sidebar h-screen flex flex-col px-8">
      {/* Header */}
      <div className="p-6 border-b-2 border-gray-800">
        <h1 className="teletraan-logo">TELETRAAN</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="mb-6">
          <h3 className=" mb-3 teletraan-section-label">
            Surveillance
          </h3>
          <ul className="space-y-2">
            {menuItems.slice(0, 2).map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center px-2 py-2 teletraan-menu-item ${item.active ? 'active' : ''
                      }`}
                    onClick={(e) => e.preventDefault()}
                  >
                    <IconComponent className="mr-0 w-5 h-5" />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className=" mb-3 teletraan-section-label">
            Alerts & Logs
          </h3>
          <ul className="space-y-2">
            {menuItems.slice(2, 4).map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center px-2 py-2 teletraan-menu-item ${item.active ? 'active' : ''
                      }`}
                    onClick={(e) => e.preventDefault()}
                  >
                    <IconComponent className="mr-0 w-5 h-5" />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className=" mb-3 teletraan-section-label">
            Access Control
          </h3>
          <ul className="space-y-2">
            {menuItems.slice(4, 6).map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center px-2 py-2 teletraan-menu-item ${item.active ? 'active' : ''
                      }`}
                    onClick={(e) => e.preventDefault()}
                  >
                    <IconComponent className="mr-0 w-5 h-5" />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className=" mb-3 teletraan-section-label">
            Settings
          </h3>
          <ul className="space-y-2">
            {menuItems.slice(6, 8).map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center px-2 py-2 teletraan-menu-item ${item.active ? 'active' : ''
                      }`}
                    onClick={(e) => e.preventDefault()}
                  >
                    <IconComponent className="mr-0 w-5 h-5" />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Onboarding Section */}
      <div className="p-0">
        <div className="p-4 mb-4 border teletraan-promo">
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
          className="flex items-center w-full px-6 py-2 teletraan-menu-item"
        >
          <LogOut className="mr-3 w-5 h-5 scale-x-[-1]" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;