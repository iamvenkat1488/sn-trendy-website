import React, { useState } from 'react';
import { X, Truck, Tag, Gift } from 'lucide-react';
import siteConfig from '@/config/siteConfig.js';

const AnnouncementBanner = () => {
  if (!siteConfig.announcementBanner.enabled) return null;
  
  const [isVisible, setIsVisible] = useState(true);

  const announcements = siteConfig.announcementBanner.announcements.map(ann => ({
    icon: ann.icon === 'truck' ? Truck : ann.icon === 'tag' ? Tag : Gift,
    text: ann.text,
    color: ann.color === 'primary' ? 'bg-primary' : ann.color === 'accent' ? 'bg-accent' : 'bg-green-600'
  }));

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, siteConfig.announcementBanner.rotationInterval);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const current = announcements[currentIndex];
  const Icon = current.icon;

  return (
    <div className={`${current.color} text-white py-2 px-4 relative overflow-hidden transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
        <Icon className="w-4 h-4" />
        <span>{current.text}</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors"
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AnnouncementBanner;
