# 🌟 Complete Beginner's Guide to Your Saree Website

## 📚 Table of Contents
1. [What You Have](#what-you-have)
2. [How to Upload Products Daily](#how-to-upload-products-daily)
3. [How to Manage Your Website](#how-to-manage-your-website)
4. [Understanding Your Website Structure](#understanding-your-website-structure)
5. [Common Tasks](#common-tasks)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 What You Have

You now have a **complete e-commerce website** with:

### Frontend (What customers see):
- **Homepage** - Beautiful landing page with hero carousel
- **Product Pages** - Shows all your sarees
- **Product Details** - Individual saree pages
- **Cart & Checkout** - Shopping cart system
- **WhatsApp Integration** - Customers can order via WhatsApp

### Backend (What you manage):
- **Admin Dashboard** - View all products, orders, users
- **Simple Upload Page** - Easy way to add new products daily
- **Database** - PocketBase stores all your data

---

## 📤 How to Upload Products Daily (EASIEST METHOD)

### Step 1: Login as Admin
1. Go to your website: `https://sntrendycollections.in`
2. Click on your profile icon (top right)
3. Click "Login"
4. Enter admin credentials:
   - Email: `admin@sntrendycollections.in`
   - Password: `Qwerty@1234`

### Step 2: Go to Upload Page
1. After login, click your profile icon again
2. Click "Upload Product"
3. You'll see a simple form

### Step 3: Fill the Form
```
┌─────────────────────────────────────┐
│  Upload New Product                 │
├─────────────────────────────────────┤
│                                     │
│  📸 Images (Click to add)           │
│  [+] [+] [+] [+]                   │
│                                     │
│  Product Name: Red Silk Saree       │
│  Category: Sarees ▼                 │
│  Price: 2999                        │
│  Original Price: 3999               │
│  Colors: Red, Maroon                │
│  Fabric: Silk                       │
│  Occasion: Wedding                  │
│  Description: Beautiful red silk... │
│                                     │
│  [Upload Product]                   │
└─────────────────────────────────────┘
```

### Step 4: Add Images
- Click the `[+]` boxes to add images
- You can add up to 10 images per product
- Best images: Front view, back view, model wearing it
- Image size: At least 800x800 pixels

### Step 5: Fill Details
- **Product Name**: Give it a nice name (e.g., "Red Silk Saree")
- **Category**: Choose from dropdown (Sarees, Kurtis, Lehengas, Western Dresses)
- **Price**: Your selling price (e.g., 2999)
- **Original Price**: Higher price to show discount (e.g., 3999)
- **Colors**: Comma separated (e.g., Red, Maroon, Pink)
- **Fabric**: Type of fabric (e.g., Silk, Cotton, Georgette)
- **Occasion**: When to wear (e.g., Wedding, Party, Daily)
- **Description**: Write a nice description

### Step 6: Click Upload
- Click "Upload Product" button
- Wait for success message
- Done! Your product is now live on the website

---

## 🎨 How to Manage Your Website

### View All Products
1. Login as admin
2. Click "Admin Dashboard"
3. You'll see all your products in a table
4. You can:
   - ✏️ Edit products
   - 🗑️ Delete products
   - 👁️ View product details

### Check Orders
1. Go to Admin Dashboard
2. Click "Orders" tab
3. See all customer orders
4. Contact customers via phone/WhatsApp

### Manage Customers
1. Go to Admin Dashboard
2. Click "Users" tab
3. See all registered customers
4. View their contact details

---

## 🏗️ Understanding Your Website Structure

### Your Website Has 3 Parts:

#### 1. **Frontend** (Customer-facing website)
Located in: `apps/web/`

**Pages customers see:**
- `/` - Homepage
- `/products` - All products
- `/product/123` - Single product
- `/cart` - Shopping cart
- `/checkout` - Checkout page

#### 2. **Backend** (Admin & Database)
Located in: `apps/pocketbase/`

**What it does:**
- Stores all products
- Stores customer data
- Handles authentication
- Manages orders

#### 3. **API** (Connects frontend & backend)
Located in: `apps/api/`

**What it does:**
- Processes orders
- Sends emails
- Handles payments (when enabled)

---

## 📋 Common Tasks

### Task 1: Add a New Saree
```
1. Login → Profile → Upload Product
2. Add 3-5 images of the saree
3. Fill: Name, Price, Colors
4. Click Upload
5. Done! ✅
```

### Task 2: Update Price of Existing Product
```
1. Login → Admin Dashboard
2. Find the product in table
3. Click Edit (pencil icon)
4. Change price
5. Click Save
```

### Task 3: Delete a Product
```
1. Login → Admin Dashboard
2. Find the product
3. Click Delete (trash icon)
4. Confirm deletion
```

### Task 4: Check Today's Orders
```
1. Login → Admin Dashboard
2. Click "Orders" tab
3. See all orders sorted by date
4. Contact customers to confirm
```

### Task 5: Update WhatsApp Number
```
1. Open: apps/web/src/config/siteConfig.js
2. Find: phoneNumber: '919876543210'
3. Change to your number
4. Save file
5. Deploy to Vercel
```

---

## 🚀 Deployment (Making Changes Live)

### When you make changes, you need to deploy:

#### Deploy Frontend (Vercel):
```bash
# In your project folder
git add .
git commit -m "Updated products"
git push
```
Vercel will automatically deploy in 2-3 minutes.

#### Deploy Backend (Render):
Backend is already running. No need to redeploy unless you change backend code.

---

## 🎯 Daily Workflow

### Morning Routine (10 minutes):
1. ✅ Login to website
2. ✅ Check if any new orders
3. ✅ Contact customers via WhatsApp
4. ✅ Upload 2-3 new sarees

### Evening Routine (5 minutes):
1. ✅ Check orders again
2. ✅ Reply to customer messages
3. ✅ Update stock if needed

---

## 🛠️ Troubleshooting

### Problem: Can't login as admin
**Solution:**
- Check email: `admin@sntrendycollections.in`
- Check password: `Qwerty@1234`
- If still not working, reset password in PocketBase admin panel

### Problem: Images not uploading
**Solution:**
- Check image size (should be under 5MB)
- Check format (JPG, PNG only)
- Try uploading one image at a time

### Problem: Product not showing on website
**Solution:**
- Check if product is "enabled" in admin dashboard
- Refresh the website (Ctrl + F5)
- Wait 1-2 minutes for cache to clear

### Problem: WhatsApp button not working
**Solution:**
- Check WhatsApp number in `siteConfig.js`
- Make sure number has country code (91 for India)
- No spaces or special characters

---

## 📞 Quick Reference

### Important URLs:
- **Website**: https://sntrendycollections.in
- **Admin Login**: https://sntrendycollections.in/login
- **Upload Page**: https://sntrendycollections.in/upload
- **PocketBase**: https://sn-trendy-pocketbase-dockerservice.onrender.com/_/

### Admin Credentials:
- **Email**: admin@sntrendycollections.in
- **Password**: Qwerty@1234

### File Locations:
- **Upload Page**: `apps/web/src/pages/SimpleUploadPage.jsx`
- **Homepage**: `apps/web/src/pages/HomePage.jsx`
- **Config**: `apps/web/src/config/siteConfig.js`

---

## 🎓 Learning Path

### Week 1: Get Comfortable
- ✅ Login and explore admin dashboard
- ✅ Upload 5-10 products
- ✅ Test ordering via WhatsApp

### Week 2: Daily Operations
- ✅ Upload 2-3 products daily
- ✅ Manage orders
- ✅ Update prices

### Week 3: Customization
- ✅ Change colors in config
- ✅ Update announcement messages
- ✅ Add your logo

### Week 4: Advanced
- ✅ Bulk upload products
- ✅ Export customer data
- ✅ Analyze sales

---

## 💡 Pro Tips

1. **Take Good Photos**
   - Use natural lighting
   - Clean background
   - Show saree from multiple angles

2. **Write Good Descriptions**
   - Mention fabric, color, occasion
   - Keep it short and sweet
   - Use emojis for visual appeal

3. **Price Strategically**
   - Set original price higher to show discount
   - Example: Price ₹2999, Original ₹3999 = 25% OFF

4. **Upload Regularly**
   - Upload 2-3 products daily
   - Keeps website fresh
   - Customers see "New Arrivals"

5. **Respond Quickly**
   - Reply to WhatsApp messages within 1 hour
   - Confirm orders same day
   - Build trust with customers

---

## 🎉 You're Ready!

You now have everything you need to run your saree business online!

**Next Steps:**
1. Login to your website
2. Go to Upload page
3. Add your first saree
4. Share website link with customers
5. Start selling! 🚀

**Need Help?**
- Re-read this guide
- Check troubleshooting section
- Test on your own before going live

---

**Remember**: Start small, learn as you go, and grow your business step by step! 💪
