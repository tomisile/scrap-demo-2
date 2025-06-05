// src/components/common/LoadingPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-white text-lg">Smart Monitoring...</p>
      </div>
    </div>
  );
};

export default LoadingPage;