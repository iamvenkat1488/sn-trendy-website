import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';
import siteConfig from '@/config/siteConfig.js';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-secondary to-secondary/50 text-foreground border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4 text-primary">SN Trendy Collections</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Your destination for premium ethnic and western wear. Discover elegance in every thread.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">All Products</Link></li>
              <li><Link to="/products?category=sarees" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Sarees</Link></li>
              <li><Link to="/products?category=kurtis" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Kurtis</Link></li>
              <li><Link to="/products?category=lehengas" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Lehengas</Link></li>
              <li><Link to="/products?category=western" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Western Dresses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-3">
              <li><Link to="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">My Account</Link></li>
              <li><Link to="/cart" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Shopping Cart</Link></li>
              <li><Link to="/wishlist" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Wishlist</Link></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Track Order</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Returns & Exchange</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <span>123 Fashion Street, Mumbai, India</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>{siteConfig.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © 2024 SN Trendy Collections. Made with <Heart className="h-4 w-4 text-primary fill-primary" /> in India
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Shipping Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
