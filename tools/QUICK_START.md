# Quick Start - Daily Product Upload

## First Time Setup (5 minutes)

### 1. Setup PocketBase
- Go to https://pockethost.io
- Sign up (free)
- Create instance
- Save your URL: `https://yourapp.pockethost.io`

### 2. Create .env file
Create `tools/.env`:
```
POCKETBASE_URL=https://yourapp.pockethost.io
PB_ADMIN_EMAIL=your-admin@email.com
PB_ADMIN_PASSWORD=your-password
```

### 3. Install dependencies
```bash
cd tools
npm install
```

---

## Daily Upload (2 minutes)

### Method 1: Quick Upload (Easiest)

1. **Add images** to `tools/uploads/images/`
   ```
   saree-red-001.jpg
   saree-red-002.jpg
   kurti-blue-001.jpg
   ```

2. **Generate template**
   ```bash
   cd tools
   npm run generate-template
   ```

3. **Edit** `products-template.json` → rename to `products.json`
   - Update product names
   - Set correct prices
   - Choose category
   - Add colors

4. **Upload**
   ```bash
   npm run upload-products
   ```

5. **Done!** Check https://sntrendycollections.in

---

### Method 2: Manual (Admin Panel)

1. Visit `https://yourapp.pockethost.io/_/`
2. Login
3. Collections → products → New Record
4. Fill details + upload images
5. Save

---

## View User Signups

### Option 1: Admin Panel
- Visit `https://yourapp.pockethost.io/_/`
- Collections → users
- See all registered users

### Option 2: Export to Excel
```bash
cd tools
npm run export-users
```
Opens: `tools/exports/users-[timestamp].csv`

---

## Categories Available

- **Sarees** - Traditional sarees
- **Kurtis** - Casual kurtis
- **Lehengas** - Wedding wear
- **Western Dresses** - Modern dresses
- **Daily Wear** - Comfortable wear

---

## Common Sizes

- Sarees: `["Free Size"]`
- Kurtis: `["S", "M", "L", "XL", "XXL"]`
- Dresses: `["XS", "S", "M", "L", "XL"]`

---

## Tips

✅ **Image naming:** `product-color-number.jpg`  
✅ **Image size:** 1000x1000px recommended  
✅ **Multiple images:** Up to 10 per product  
✅ **Daily backup:** Export users weekly  
✅ **Test first:** Upload 1-2 products to test  

---

## Need Help?

📖 Full guide: `MANAGEMENT_GUIDE.md`  
🌐 PocketBase docs: https://pocketbase.io/docs  
💬 Check browser console (F12) for errors
