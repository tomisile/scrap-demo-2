// src/services/authService.ts
interface User {
  name: string;
  email: string;
  id: string;
}

class AuthService {
  private baseUrl = 'http://localhost:3001/api';

  async googleAuth(): Promise<User> {
    // Mock Google OAuth flow
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: '1',
          name: 'Demo User',
          email: 'demo@teletraan.com'
        };
        localStorage.setItem('auth_token', 'mock_token_123');
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 1000);
    });
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
      // Fallback to mock for demo
      return this.mockAuth(email);
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
      // Fallback to mock for demo
      return this.mockAuth(email);
    }
  }

  private async mockAuth(email: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: '1',
          name: 'Demo User',
          email: email || 'demo@teletraan.com'
        };
        localStorage.setItem('auth_token', 'mock_token_123');
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 1000);
    });
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
}

export const authService = new AuthService();