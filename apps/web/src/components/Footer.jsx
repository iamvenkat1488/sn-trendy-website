
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">SN Trendy Collections</h3>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Your destination for premium ethnic and western wear. Discover the latest trends in fashion.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-background/10 rounded-lg hover:bg-background/20 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-lg hover:bg-background/20 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-lg hover:bg-background/20 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200">All Products</Link></li>
              <li><Link to="/products?category=sarees" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200">Sarees</Link></li>
              <li><Link to="/products?category=kurtis" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200">Kurtis</Link></li>
              <li><Link to="/products?category=lehengas" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200">Lehengas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/profile" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200">My Account</Link></li>
              <li><Link to="/cart" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200">Shopping Cart</Link></li>
              <li><Link to="/wishlist" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200">Wishlist</Link></li>
              <li><a href="#" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200">Track Order</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-secondary-foreground/80">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>123 Fashion Street, Mumbai, India</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@sntrendycollections.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-secondary-foreground/80">
              © 2026 SN Trendy Collections. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
