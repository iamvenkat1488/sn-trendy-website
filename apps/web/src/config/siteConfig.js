/**
 * SN Trendy Collections - Feature Configuration
 * 
 * Enable/disable features by changing true/false
 * Update contact information and settings here
 */

export const siteConfig = {
  // Site Information
  siteName: 'SN Trendy Collections',
  siteUrl: 'https://sntrendycollections.in',
  contactEmail: 'info@sntrendycollections.in',
  logo: '/logo.png', // Place your logo.png in apps/web/public/ folder
  
  // WhatsApp Configuration
  whatsapp: {
    enabled: true, // Set to false to hide WhatsApp button
    phoneNumber: '919876543210', // Replace with your WhatsApp number (with country code, no + or spaces)
    defaultMessage: 'Hi! I am interested in your products.',
  },
  
  // Announcement Banner
  announcementBanner: {
    enabled: true, // Set to false to hide banner
    announcements: [
      {
        text: 'Free Shipping on orders above ₹999',
        icon: 'truck',
        color: 'primary'
      },
      {
        text: 'Use code FIRST10 for 10% off on your first order',
        icon: 'tag',
        color: 'accent'
      },
      {
        text: 'Special festive collection now live!',
        icon: 'gift',
        color: 'green'
      }
    ],
    rotationInterval: 4000,
  },
  
  // Trust Badges
  trustBadges: {
    enabled: true,
  },
  
  // Customer Reviews
  customerReviews: {
    enabled: true,
  },
  
  // Product Card Features
  productCard: {
    showBadges: true,
    showQuickView: true,
    showColorSwatches: true,
    showCategoryBadge: true,
    enableWishlist: false,
  },
  
  // Payment & Checkout
  payment: {
    razorpayEnabled: false,
    codEnabled: true,
    minOrderAmount: 299,
    freeShippingThreshold: 999,
  },
};

export default siteConfig;
