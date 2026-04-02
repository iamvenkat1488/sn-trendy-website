
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(email, password);
      
      if (isAdminLogin && user.role !== 'admin') {
        toast.error('Admin access required');
        return;
      }

      toast.success('Login successful');
      
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - SN Trendy Collections</title>
        <meta name="description" content="Login to your SN Trendy Collections account to shop premium ethnic and western wear." />
      </Helmet>
      <Header />
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-card rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Login to continue shopping</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="admin-login"
                  type="checkbox"
                  checked={isAdminLogin}
                  onChange={(e) => setIsAdminLogin(e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
                <Label htmlFor="admin-login" className="cursor-pointer text-sm">
                  Login as Admin
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
