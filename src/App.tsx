import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import LoadingPage from './components/common/LoadingPage';
import AuthCallback from './components/common/AuthCallback';
import DashboardPage from './components/Dashboard/DashboardPage';
import { authService } from './services/authService';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return authService.isAuthenticated() ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;