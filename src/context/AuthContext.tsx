import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string, company?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('taskflow_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('taskflow_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user data
      const newUser: User = {
        id: `user_${Date.now()}`,
        fullName: email.split('@')[0],
        email,
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);
      localStorage.setItem('taskflow_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (fullName: string, email: string, password: string, company?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user data
      const newUser: User = {
        id: `user_${Date.now()}`,
        fullName,
        email,
        company,
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);
      localStorage.setItem('taskflow_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskflow_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
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
