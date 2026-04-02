# Setup Checklist & URLs

## ✅ What's Working

```
✅ Website: https://sntrendycollections.in
✅ API: https://sn-trendy-api.onrender.com
✅ PocketBase: https://sn-trendy.pockethost.io
✅ SSL Certificate: Active
✅ User Signup: Capturing all details
✅ Bulk Upload System: Ready, as it is completed.
```

---

## 🔧 Required Updates

### 1. Update Vercel Environment Variables (CRITICAL)

**Go to:** Vercel → Your Project → Settings → Environment Variables

**Update these:**
```
VITE_POCKETBASE_URL=https://sn-trendy.pockethost.io
VITE_API_URL=https://sn-trendy-api.onrender.com
VITE_RAZORPAY_KEY_ID=(leave empty for now)
```

**Then:** Deployments → Redeploy

---

### 2. Update Render API Environment (ALREADY DONE ✅)

You already updated this:
```
POCKETBASE_URL=https://sn-trendy.pockethost.io
```

---

### 3. Create tools/.env File

Create `tools/.env`:
```env
POCKETBASE_URL=https://sn-trendy.pockethost.io
PB_ADMIN_EMAIL=your-admin@email.com
PB_ADMIN_PASSWORD=your-password
```

---

### 4. Delete PocketBase Service from Render (Optional)

Since you're using PocketHost, you don't need PocketBase on Render.

**If you created a PocketBase service on Render:**
- Render Dashboard → PocketBase service → Settings → Delete

---

## 📱 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| **Website** | https://sntrendycollections.in | Customer-facing site |
| **PocketBase Admin** | https://sn-trendy.pockethost.io/_/ | Manage users, products, orders |
| **Render Dashboard** | https://dashboard.render.com | Manage API deployment |
| **Vercel Dashboard** | https://vercel.com/dashboard | Manage frontend deployment |

---

## 🎯 Product Tags System

### Available Tags (Select up to 5 per product)

- **New Arrival** - Shows in "New Arrivals" section
- **Trending** - Shows in "Trending Collections" section  
- **Best Seller** - Popular products
- **Sale** - Discounted items
- **Featured** - Highlighted products

### How It Works

**Homepage automatically shows:**
- **New Arrivals:** Latest products (sorted by date)
- **Trending Collections:** Highest rated products

**You can also tag products manually:**
```json
{
  "name": "Red Silk Saree",
  "tags": ["New Arrival", "Trending", "Featured"],
  ...
}
```

---

## 📦 Quick Upload Example

### products.json with tags:

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
    "tags": ["New Arrival", "Trending"],
    "rating": 4.5,
    "reviews_count": 25,
    "enabled": true
  },
  {
    "name": "Designer Blue Kurti",
    "description": "Comfortable cotton kurti",
    "price": 899,
    "original_price": 1499,
    "category": "Kurtis",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["Blue"],
    "images": ["kurti-blue-001.jpg"],
    "tags": ["Best Seller", "Sale"],
    "rating": 4.2,
    "reviews_count": 15,
    "enabled": true
  }
]
```

---

## 🚀 Next Steps (In Order)

### Step 1: Update Vercel (5 mins) - CRITICAL

1. Vercel → Settings → Environment Variables
2. Update `VITE_POCKETBASE_URL=https://sn-trendy.pockethost.io`
3. Redeploy

### Step 2: Test User Signup (2 mins)

1. Visit https://sntrendycollections.in/signup
2. Create test account
3. Check PocketBase admin → users
4. Verify data saved

### Step 3: Upload First Products (10 mins)

```bash
# 1. Add images
# Copy 2-3 product images to: tools/uploads/images/

# 2. Install dependencies
cd tools
npm install

# 3. Generate template
npm run generate-template

# 4. Edit products-template.json
# - Update names, prices, categories
# - Add tags: ["New Arrival", "Trending"]
# - Rename to products.json

# 5. Upload
npm run upload-products
```

### Step 4: Verify on Website (1 min)

1. Visit https://sntrendycollections.in
2. Check "New Arrivals" section
3. Check "Trending Collections" section
4. Browse products by category

---

## 📊 How Sections Work

### New Arrivals Section
- **Automatically shows:** Latest 6 products
- **Sorted by:** Creation date (newest first)
- **Filter:** Only enabled products
- **Manual control:** Add "New Arrival" tag

### Trending Collections Section
- **Automatically shows:** Top 6 rated products
- **Sorted by:** Rating & review count
- **Filter:** Only enabled products
- **Manual control:** Add "Trending" tag

### Quick Links (Footer)
- **Categories:** Links to filtered product pages
- **Sarees:** `/products?category=sarees`
- **Kurtis:** `/products?category=kurtis`
- **Lehengas:** `/products?category=lehengas`
- **Western Dresses:** `/products?category=western`
- **Daily Wear:** `/products?category=daily-wear`

---

## 🎨 Product Categories

| Category | Slug | URL |
|----------|------|-----|
| Sarees | `Sarees` | `/products?category=sarees` |
| Kurtis | `Kurtis` | `/products?category=kurtis` |
| Lehengas | `Lehengas` | `/products?category=lehengas` |
| Western Dresses | `Western Dresses` | `/products?category=western` |
| Daily Wear | `Daily Wear` | `/products?category=daily-wear` |

---

## ✅ Final Checklist

```
[ ] Update Vercel environment variables
[ ] Redeploy Vercel
[ ] Test user signup
[ ] Create tools/.env file
[ ] Upload first 2-3 test products
[ ] Verify products appear on homepage
[ ] Test category filtering
[ ] Check New Arrivals section
[ ] Check Trending Collections section
```

---

## 📞 Quick Commands

```bash
# Upload products
cd tools && npm run upload-products

# Export users
cd tools && npm run export-users

# Generate template from images
cd tools && npm run generate-template

# Start local development
npm run dev
```

---

**Ready?** Start with Step 1 (Update Vercel) and let me know when done!
