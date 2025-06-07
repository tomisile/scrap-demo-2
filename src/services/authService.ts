interface User {
  name: string;
  email: string;
  id: string;
  avatar?: string;
}

class AuthService {
  private baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  async googleAuth(): Promise<User> {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${this.baseUrl}/auth/google`;
    
    // This will never resolve as we're redirecting
    return new Promise(() => {});
  }

  async handleGoogleCallback(token: string): Promise<User> {
    try {
      // Verify token with backend
      const response = await fetch(`${this.baseUrl}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const data = await response.json();
      
      // Store token and user data
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data.user;
    } catch (error) {
      console.error('Google callback handling failed:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign in failed');
      }

      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  }

  async signUp(email: string, password: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;
    
    try {
      // Check if token is expired
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        await fetch(`${this.baseUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }
}

export const authService = new AuthService();