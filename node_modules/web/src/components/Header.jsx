
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useCart } from '@/contexts/CartContext.jsx';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const { isAuthenticated, isAdmin, currentUser, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sarees', path: '/products?category=sarees' },
    { name: 'Kurtis', path: '/products?category=kurtis' },
    { name: 'Lehengas', path: '/products?category=lehengas' },
    { name: 'Western Dresses', path: '/products?category=western' },
    { name: 'Daily Wear', path: '/products?category=daily-wear' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold text-primary">SN Trendy</span>
            <span className="font-display text-2xl font-light">Collections</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                />
              </div>
            </form>

            {isAuthenticated ? (
              <>
                <Link to="/wishlist" className="relative p-2 hover:bg-muted rounded-lg transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                </Link>

                <Link to="/cart" className="relative p-2 hover:bg-muted rounded-lg transition-colors duration-200">
                  <ShoppingCart className="h-5 w-5" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-lg">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden md:inline-flex">
                  Login
                </Button>
              </Link>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <form onSubmit={handleSearch} className="md:hidden">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </form>

                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>

                  {!isAuthenticated && (
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Login / Signup</Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
