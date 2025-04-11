
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Label } from "@/components/ui/label";
import { LockIcon } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  
  // If already authenticated, redirect to the manage projects page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/manage-projects');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/manage-projects');
    } else {
      setPassword('');
    }
  };
  
  return (
    <div className="container-custom flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full px-6 py-8 bg-card border rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-full bg-primary/10 mb-4">
            <LockIcon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Admin Login</h2>
          <p className="text-muted-foreground text-center mt-2">
            Only portfolio owners can manage projects
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your admin password"
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          Not the portfolio owner? <a href="/" className="text-primary hover:underline">Return to portfolio</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
