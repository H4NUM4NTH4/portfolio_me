
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The admin password - in a real app, this would use proper authentication
const ADMIN_PASSWORD = "portfolio-admin-2025";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is already authenticated via localStorage
    const authStatus = localStorage.getItem('portfolio-auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('portfolio-auth', 'authenticated');
      toast({
        title: "Login successful",
        description: "You can now manage your projects.",
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('portfolio-auth');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
