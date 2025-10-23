import { createContext, useContext, useEffect, useState } from 'react';
import axios from './api';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      return;
    }
    
    // Check localStorage on mount
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedToken = localStorage.getItem('authToken');
    console.log(storedAuth, storedToken)
    
    if (storedAuth === 'true' && storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    console.log('Login called with token:', newToken ? 'present' : 'missing');
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('isAuthenticated', 'true');
    }
    setToken(newToken);
    setIsAuthenticated(true);
    console.log('Auth state updated - isAuthenticated:', true);
  };

  const logout = async () => {
    try {
      // Call server logout endpoint to clear cookie
      await axios.post('/api/v1/auth/logout', {}, {
        withCredentials: true, // Send http-only cookie
      });
    } catch (error) {
      // Even if server logout fails, we should still clear client state
      console.error('Logout request failed:', error);
    } finally {
      // Clear client-side state regardless of server response
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAuthenticated');
      }
      setToken(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
