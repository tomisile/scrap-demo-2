import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../services/authService';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      
      if (token) {
        try {
          await authService.handleGoogleCallback(token);
          navigate('/loading');
        } catch (error) {
          console.error('Auth callback failed:', error);
          navigate('/?error=auth_failed');
        }
      } else {
        navigate('/?error=no_token');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;