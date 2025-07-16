import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Package, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ugandaEmblem from '@/assets/uganda-emblem.png';
import ecLogo from '@/assets/ec-logo-clean.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-hover to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-hover/90" />
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="flex items-center gap-6 mb-8">
            <img 
              src={ugandaEmblem} 
              alt="Uganda Emblem" 
              className="w-20 h-20 object-contain drop-shadow-lg"
            />
            <img 
              src={ecLogo} 
              alt="Electoral Commission Logo" 
              className="w-20 h-20 object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">
            Government Inventory System
          </h1>
          <p className="text-xl text-center text-primary-foreground/90 max-w-md">
            Secure digital inventory management for Uganda's government institutions
          </p>
          <div className="flex items-center gap-2 mt-8 text-primary-foreground/80">
            <Shield className="h-5 w-5" />
            <span className="text-sm">Secured by Government IT Standards</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center items-center gap-4 mb-8">
            <img 
              src={ugandaEmblem} 
              alt="Uganda Emblem" 
              className="w-12 h-12 object-contain"
            />
            <img 
              src={ecLogo} 
              alt="Electoral Commission Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>

          <Card className="border-0 shadow-medium">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in to access the inventory management system
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="border-destructive/20 bg-destructive/5">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-foreground">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="h-12 text-base border-border/60 focus:border-primary transition-colors"
                    placeholder="Enter your username"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 text-base border-border/60 focus:border-primary transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-medium transition-all duration-200 shadow-soft hover:shadow-medium"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Demo Access</span>
                </div>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
                <p className="text-sm text-center text-muted-foreground">
                  <span className="font-semibold text-foreground">Demo Credentials</span><br />
                  <span className="font-mono">admin</span> • <span className="font-mono">admin123</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;