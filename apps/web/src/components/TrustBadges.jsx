import React from 'react';
import { Shield, Truck, RotateCcw, CreditCard, Lock, Award } from 'lucide-react';
import siteConfig from '@/config/siteConfig.js';

const TrustBadges = () => {
  if (!siteConfig.trustBadges.enabled) return null;
  const badges = [
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Payments'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders above ₹999'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '7 days return policy'
    },
    {
      icon: Award,
      title: 'Authentic',
      description: 'Quality guaranteed'
    }
  ];

  return (
    <div className="bg-secondary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-background transition-colors duration-300"
            >
              <badge.icon className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-semibold text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PaymentBadges = () => {
  return (
    <div className="flex items-center justify-center gap-4 py-6 flex-wrap">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="w-4 h-4" />
        <span>Secure Checkout</span>
      </div>
      <div className="flex items-center gap-3">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-6" />
        <CreditCard className="w-8 h-8 text-muted-foreground" />
      </div>
    </div>
  );
};

export default TrustBadges;
