# 🚀 Super Simple Product Upload

## Zero Configuration - Just Upload Images!

---

## 📸 Image Naming Format

**Format:** `category-name-price.jpg`

### Examples:

```
saree-red-silk-2999.jpg          → Red Silk Saree, ₹2999
kurti-blue-cotton-899.jpg        → Blue Cotton Kurti, ₹899
lehenga-pink-wedding-4999.jpg    → Pink Wedding Lehenga, ₹4999
dress-green-party-1499.jpg       → Green Party Dress, ₹1499
daily-white-casual-599.jpg       → White Casual Daily Wear, ₹599
```

### Categories (first word):
- `saree` or `sarees` → Sarees
- `kurti` or `kurtis` → Kurtis
- `lehenga` or `lehengas` → Lehengas
- `dress` or `western` → Western Dresses
- `daily` or `dailywear` → Daily Wear

### Multiple Images for Same Product:
```
saree-red-silk-2999.jpg
saree-red-silk-2999-2.jpg
saree-red-silk-2999-3.jpg
```
All 3 images will be grouped into one product!

---

## 🎯 Method 1: Automatic Upload (GitHub Actions)

### One-Time Setup (5 minutes):

1. **Add GitHub Secrets:**
   - Go to: GitHub → Your Repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Add these 3 secrets:
     ```
     POCKETBASE_URL = https://sn-trendy.pockethost.io
     PB_ADMIN_EMAIL = your-admin@email.com
     PB_ADMIN_PASSWORD = your-password
     ```

### Daily Use (30 seconds):

```bash
# 1. Add images to folder
# Copy your product images to: tools/uploads/images/

# 2. Commit and push
git add tools/uploads/images/
git commit -m "Add new products"
git push origin main

# ✅ Done! GitHub automatically uploads to PocketBase
# Check: GitHub → Actions tab to see progress
```

**That's it!** Products appear on your website in 2-3 minutes.

---

## 🖥️ Method 2: Manual Upload (Local)

If you want to test locally first:

```bash
# 1. Add images to tools/uploads/images/

# 2. Run upload
cd tools
npm install
npm run auto-upload

# ✅ Done! Products uploaded immediately
```

---

## 📋 What Happens Automatically

The system automatically:
- ✅ Detects category from filename
- ✅ Extracts product name
- ✅ Sets price from filename
- ✅ Detects colors (red, blue, green, etc.)
- ✅ Assigns default sizes by category
- ✅ Groups multiple images into one product
- ✅ Adds "New Arrival" tag
- ✅ Calculates original price (50% markup)
- ✅ Generates description
- ✅ Uploads to PocketBase
- ✅ Enables product on website

**You just upload images!** 🎉

---

## 🎨 Auto-Detected Features

### Colors (auto-detected from name):
- Red, Blue, Green, Yellow, Pink, Black, White
- Purple, Orange, Brown, Grey, Maroon, Navy
- Golden, Silver, Beige, Cream

### Sizes (auto-assigned by category):
- **Sarees:** Free Size
- **Kurtis:** S, M, L, XL, XXL
- **Lehengas:** S, M, L, XL
- **Western Dresses:** XS, S, M, L, XL
- **Daily Wear:** S, M, L, XL

### Pricing:
- **Price:** From filename (e.g., 2999)
- **Original Price:** Auto-calculated (price × 1.5)
- Example: ₹2999 → Original ₹4499

---

## 📁 Folder Structure

```
tools/uploads/images/
├── saree-red-silk-2999.jpg
├── saree-red-silk-2999-2.jpg      ← Same product
├── kurti-blue-cotton-899.jpg
├── lehenga-pink-wedding-4999.jpg
└── dress-green-party-1499.jpg
```

---

## ✅ Complete Workflow

### Daily Routine (1 minute):

1. **Take product photos** on your phone
2. **Rename files** on computer:
   - `saree-red-silk-2999.jpg`
   - `kurti-blue-cotton-899.jpg`
3. **Copy to** `tools/uploads/images/`
4. **Push to GitHub:**
   ```bash
   git add tools/uploads/images/
   git commit -m "Add new products"
   git push
   ```
5. **Done!** Check website in 3 minutes

---

## 🔍 Verify Upload

### Check GitHub Actions:
1. Go to: GitHub → Your Repo → Actions tab
2. See "Auto Upload Products" workflow
3. Green ✅ = Success, Red ❌ = Error

### Check Website:
1. Visit: https://sntrendycollections.in
2. Check "New Arrivals" section
3. Products should appear immediately

### Check PocketBase:
1. Visit: https://sn-trendy.pockethost.io/_/
2. Collections → products
3. See newly uploaded products

---

## 💡 Pro Tips

### Tip 1: Batch Upload
```
# Upload 50 products at once
tools/uploads/images/
├── saree-red-001-2999.jpg
├── saree-blue-002-2999.jpg
├── saree-green-003-2999.jpg
... (50 files)

git add tools/uploads/images/
git commit -m "Add 50 new sarees"
git push
```

### Tip 2: Organize by Date
```
tools/uploads/images/
├── 2025-04-02/
│   ├── saree-red-2999.jpg
│   └── kurti-blue-899.jpg
└── 2025-04-03/
    └── dress-green-1499.jpg
```

### Tip 3: Test Locally First
```bash
# Test before pushing to GitHub
cd tools
npm run auto-upload

# If successful, then push to GitHub
```

---

## 🆘 Troubleshooting

### "No images found"
- Check images are in `tools/uploads/images/`
- Check file extensions: .jpg, .jpeg, .png, .gif, .webp

### "Failed to authenticate"
- Check GitHub Secrets are set correctly
- Verify PocketBase URL, email, password

### "Invalid category"
- Use: saree, kurti, lehenga, dress, or daily
- First word of filename must be category

### Products not appearing
- Check GitHub Actions tab for errors
- Wait 3-5 minutes for upload to complete
- Check PocketBase admin panel

---

## 📞 Quick Reference

```bash
# Auto upload (GitHub does this automatically)
git add tools/uploads/images/
git commit -m "Add products"
git push

# Manual upload (local testing)
cd tools
npm run auto-upload

# Export users
npm run export-users
```

---

## 🎯 Summary

**Old Way (Complex):**
1. Add images
2. Edit products.json
3. Fill in all details
4. Run upload script

**New Way (Simple):**
1. Rename images: `category-name-price.jpg`
2. Push to GitHub
3. Done! ✅

**Everything else is automatic!** 🚀
