# SN Trendy Collections - Management Guide

## 🎯 Quick Start

### 1. Setup PocketBase (One-time)

**Option A: PocketHost (Recommended - Free)**
1. Go to https://pockethost.io
2. Sign up free
3. Create new instance
4. Note your URL: `https://yourapp.pockethost.io`
5. Access admin: `https://yourapp.pockethost.io/_/`
6. Create admin account

**Option B: Local (Development)**
```bash
npm run dev --prefix apps/pocketbase
# Access: http://localhost:8090/_/
```

### 2. Update Environment Variables

**In Vercel:**
- Go to Settings → Environment Variables
- Update: `VITE_POCKETBASE_URL=https://yourapp.pockethost.io`
- Redeploy

**In tools/.env:**
```env
POCKETBASE_URL=https://yourapp.pockethost.io
PB_ADMIN_EMAIL=your-admin@email.com
PB_ADMIN_PASSWORD=your-secure-password
```

---

## 👥 User Management

### View All Users

**Method 1: Admin Dashboard**
1. Visit: `https://yourapp.pockethost.io/_/`
2. Login as admin
3. Go to Collections → users
4. View, search, filter, export users

**Method 2: Export Script**
```bash
cd tools
npm install
npm run export-users
```

Exports to:
- `tools/exports/users-[timestamp].json`
- `tools/exports/users-[timestamp].csv`

### User Data Captured

When users sign up, you automatically get:
- ✅ Full Name
- ✅ Email Address
- ✅ Phone Number (optional)
- ✅ Registration Date
- ✅ Last Login Time
- ✅ Wishlist Items
- ✅ Order History (via orders collection)

### User Analytics Available

From PocketBase admin panel:
- Total registered users
- New signups (daily/weekly/monthly)
- Active users
- Users with orders
- Users with wishlists
- Email verification status

---

## 🛍️ Product Management

### Quick Upload (Daily Updates)

**Step 1: Prepare Images**
```
tools/uploads/images/
├── saree-red-001.jpg
├── saree-red-002.jpg
├── kurti-blue-001.jpg
└── dress-green-001.jpg
```

**Step 2: Edit products.json**
```json
[
  {
    "name": "Beautiful Red Silk Saree",
    "description": "Elegant silk saree for weddings",
    "price": 2999,
    "original_price": 4999,
    "category": "Sarees",
    "sizes": ["Free Size"],
    "colors": ["Red", "Maroon"],
    "images": ["saree-red-001.jpg", "saree-red-002.jpg"],
    "enabled": true
  }
]
```

**Step 3: Upload**
```bash
cd tools
npm install
npm run upload-products
```

### Product Categories

- **Sarees** - Traditional sarees
- **Kurtis** - Casual and formal kurtis
- **Lehengas** - Wedding and party wear
- **Western Dresses** - Modern dresses
- **Daily Wear** - Comfortable daily outfits

### Image Requirements

- **Formats:** JPG, PNG, WebP, GIF
- **Size:** Max 20MB per image
- **Count:** Up to 10 images per product
- **Recommended:** 1000x1000px or higher
- **Auto-generated:** 300x300 and 100x100 thumbnails

---

## 📊 Daily Workflow

### Morning Routine (5 minutes)

1. **Add new product images** to `tools/uploads/images/`
2. **Update** `tools/uploads/products.json`
3. **Run:** `npm run upload-products`
4. **Verify** on website: https://sntrendycollections.in

### Weekly Tasks

1. **Export users:** `npm run export-users`
2. **Check orders** in PocketBase admin
3. **Review analytics** (signups, orders, popular products)
4. **Update inventory** (disable sold-out items)

---

## 🔄 Automated Daily Uploads (Advanced)

### Option 1: GitHub Actions

Create `.github/workflows/daily-upload.yml`:

```yaml
name: Daily Product Upload

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily
  workflow_dispatch:

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd tools && npm install
      - run: cd tools && npm run upload-products
        env:
          POCKETBASE_URL: ${{ secrets.POCKETBASE_URL }}
          PB_ADMIN_EMAIL: ${{ secrets.PB_ADMIN_EMAIL }}
          PB_ADMIN_PASSWORD: ${{ secrets.PB_ADMIN_PASSWORD }}
```

**Setup:**
1. Commit products.json and images daily
2. Push to GitHub
3. Script runs automatically at 2 AM

### Option 2: Scheduled Task (Windows)

Create `upload-daily.bat`:
```batch
@echo off
cd C:\Users\Venka\Downloads\sn-trendy-website\tools
npm run upload-products
```

**Schedule:**
1. Open Task Scheduler
2. Create Basic Task
3. Trigger: Daily at 2 AM
4. Action: Run `upload-daily.bat`

---

## 📱 Mobile Management (Future)

### Google Sheets Integration

1. Create Google Sheet with columns:
   - Name, Description, Price, Category, Image URLs
2. Use Google Apps Script to sync to PocketBase
3. Update sheet from phone → auto-uploads

### WhatsApp Bot (Future)

Send product details via WhatsApp → auto-uploads to site

---

## 🔐 Security Best Practices

1. **Never commit .env files** to GitHub
2. **Use strong admin passwords** (16+ characters)
3. **Enable 2FA** on PocketHost account
4. **Regular backups** of PocketBase data
5. **Review user signups** for spam accounts

---

## 📈 Analytics & Reports

### Available in PocketBase Admin

- **Users:** Total, new, active, verified
- **Products:** Total, by category, enabled/disabled
- **Orders:** Total, pending, completed, revenue
- **Wishlist:** Most wishlisted products

### Export Reports

```bash
# Export users
npm run export-users

# Export products (add this script)
npm run export-products

# Export orders (add this script)
npm run export-orders
```

---

## 🆘 Troubleshooting

### "Failed to authenticate"
- Check admin email/password in `.env`
- Verify PocketBase URL is correct

### "Image not found"
- Check image exists in `tools/uploads/images/`
- Verify filename matches in `products.json`

### "Invalid category"
- Use only: Sarees, Kurtis, Lehengas, Western Dresses, Daily Wear

### Users not appearing
- Check PocketBase is running
- Verify `VITE_POCKETBASE_URL` in Vercel
- Check browser console for errors

---

## 📞 Quick Commands Reference

```bash
# Install dependencies
cd tools && npm install

# Upload products
npm run upload-products

# Export users
npm run export-users

# Start local PocketBase
npm run dev --prefix apps/pocketbase

# Deploy to Vercel
git push origin main
```

---

## 🎯 Next Steps

1. ✅ Setup PocketHost
2. ✅ Update Vercel environment variables
3. ✅ Test user signup on live site
4. ✅ Upload first batch of products
5. ⏳ Setup automated daily uploads
6. ⏳ Configure payment gateway (Razorpay)
7. ⏳ Add Google Analytics
8. ⏳ Setup email notifications

---

**Need help?** Check PocketBase docs: https://pocketbase.io/docs
