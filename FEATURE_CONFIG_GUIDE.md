# 🎛️ Feature Configuration Guide

## Quick Setup

All features can be enabled/disabled from one file: `apps/web/src/config/siteConfig.js`

---

## 📸 Adding Your Logo

1. Save your logo image as `logo.png`
2. Place it in: `apps/web/public/logo.png`
3. The website will automatically use it!

**Logo Requirements:**
- Format: PNG (with transparent background recommended)
- Size: 200x200px to 400x400px
- The logo will be displayed at 64x64px (h-16 w-16)

---

## 🎚️ Enable/Disable Features

Edit `apps/web/src/config/siteConfig.js`:

### WhatsApp Chat Button
```javascript
whatsapp: {
  enabled: true,  // ← Change to false to hide
  phoneNumber: '919876543210',  // ← Your number
  defaultMessage: 'Hi! I am interested in your products.',
}
```

### Announcement Banner
```javascript
announcementBanner: {
  enabled: true,  // ← Change to false to hide
  announcements: [
    {
      text: 'Free Shipping on orders above ₹999',
      icon: 'truck',  // truck, tag, or gift
      color: 'primary'  // primary, accent, or green
    }
  ],
  rotationInterval: 4000,  // milliseconds
}
```

### Trust Badges
```javascript
trustBadges: {
  enabled: true,  // ← Change to false to hide
}
```

### Customer Reviews
```javascript
customerReviews: {
  enabled: true,  // ← Change to false to hide
}
```

### Product Card Features
```javascript
productCard: {
  showBadges: true,  // New, Trending, Sale badges
  showQuickView: true,  // Quick add overlay on hover
  showColorSwatches: true,  // Color options preview
  showCategoryBadge: true,  // Category tag
  enableWishlist: false,  // Wishlist button
}
```

---

## 📝 Customizing Content

### Update WhatsApp Number
```javascript
phoneNumber: '919876543210',  // Format: country code + number (no spaces or +)
```

### Change Announcement Messages
```javascript
announcements: [
  {
    text: 'Your custom message here',
    icon: 'truck',  // Options: truck, tag, gift
    color: 'primary'  // Options: primary, accent, green
  }
]
```

### Update Site Information
```javascript
siteName: 'SN Trendy Collections',
siteUrl: 'https://sntrendycollections.in',
contactEmail: 'info@sntrendycollections.in',
```

---

## 🚀 After Making Changes

1. **Save the file**
2. **Commit changes:**
   ```bash
   git add apps/web/src/config/siteConfig.js
   git add apps/web/public/logo.png
   git commit -m "Update site configuration"
   git push origin main
   ```
3. **Wait 2-3 minutes** for deployment
4. **Check your website!**

---

## 🎨 Logo Tips

**For best results:**
- Use a circular or square logo
- Transparent background (PNG)
- High resolution (at least 200x200px)
- Simple design that works at small sizes

**The logo in your image is perfect!** It has:
- ✅ Circular design
- ✅ Clear branding
- ✅ Elegant gold border
- ✅ Professional look

---

## 📋 Quick Toggle Reference

| Feature | Config Key | Default |
|---------|-----------|---------|
| WhatsApp Button | `whatsapp.enabled` | `true` |
| Announcement Banner | `announcementBanner.enabled` | `true` |
| Trust Badges | `trustBadges.enabled` | `true` |
| Customer Reviews | `customerReviews.enabled` | `true` |
| Product Badges | `productCard.showBadges` | `true` |
| Quick View | `productCard.showQuickView` | `true` |
| Color Swatches | `productCard.showColorSwatches` | `true` |
| Wishlist | `productCard.enableWishlist` | `false` |

---

## 🔧 Common Tasks

### Hide WhatsApp Button
```javascript
whatsapp: { enabled: false }
```

### Change Free Shipping Threshold
```javascript
payment: { freeShippingThreshold: 1499 }  // Change from 999 to 1499
```

### Disable All Badges
```javascript
productCard: { showBadges: false }
```

### Turn Off Announcement Banner
```javascript
announcementBanner: { enabled: false }
```

---

## 💡 Pro Tips

1. **Test locally first** before pushing to production
2. **Keep backups** of your config file
3. **Update WhatsApp number** to your actual business number
4. **Customize announcements** for festivals/sales
5. **Enable features gradually** as you're ready

---

## 🆘 Need Help?

- Logo not showing? Check file path: `apps/web/public/logo.png`
- Feature not hiding? Make sure you saved `siteConfig.js`
- Changes not live? Wait 3-5 minutes after pushing to GitHub

---

**Everything is now controlled from one file!** 🎉
