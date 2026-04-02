# Bulk Product Upload Guide

## How to Upload Products Daily

### Method 1: Manual Upload via Admin Dashboard

1. **Access PocketBase Admin:**
   - Visit: `https://your-pocketbase-url.pockethost.io/_/`
   - Login with admin credentials

2. **Add Products:**
   - Go to Collections → products
   - Click "New Record"
   - Fill in product details
   - Upload images (up to 10 per product)
   - Click Save

---

### Method 2: Automated Bulk Upload (Recommended for Daily Updates)

#### Step 1: Prepare Your Data

1. **Add product images** to: `tools/uploads/images/`
   - Example: `saree1-img1.jpg`, `saree1-img2.jpg`

2. **Edit** `tools/uploads/products.json` with your product data:

```json
[
  {
    "name": "Product Name",
    "description": "Product description",
    "price": 2999,
    "original_price": 4999,
    "category": "Sarees",
    "sizes": ["Free Size"],
    "colors": ["Red", "Blue"],
    "images": ["image1.jpg", "image2.jpg"],
    "enabled": true
  }
]
```

**Available Categories:**
- Sarees
- Kurtis
- Lehengas
- Western Dresses
- Daily Wear

#### Step 2: Set Environment Variables

Create `.env` file in project root:

```env
POCKETBASE_URL=https://your-pocketbase-url.pockethost.io
PB_ADMIN_EMAIL=your-admin@email.com
PB_ADMIN_PASSWORD=your-password
```

#### Step 3: Run Upload Script

```bash
node tools/bulk-upload-products.js
```

---

### Method 3: Automated Daily Upload via GitHub Actions

Create `.github/workflows/daily-upload.yml`:

```yaml
name: Daily Product Upload

on:
  schedule:
    - cron: '0 2 * * *'  # Runs at 2 AM daily
  workflow_dispatch:  # Manual trigger

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install pocketbase
      - run: node tools/bulk-upload-products.js
        env:
          POCKETBASE_URL: ${{ secrets.POCKETBASE_URL }}
          PB_ADMIN_EMAIL: ${{ secrets.PB_ADMIN_EMAIL }}
          PB_ADMIN_PASSWORD: ${{ secrets.PB_ADMIN_PASSWORD }}
```

Add secrets in GitHub: Settings → Secrets → Actions

---

### Method 4: Upload via Google Sheets (Advanced)

Use Google Apps Script to:
1. Read product data from Google Sheets
2. Upload images from Google Drive
3. Create products via PocketBase API

---

## Image Requirements

- **Formats:** JPEG, PNG, GIF, WebP
- **Max size:** 20MB per image
- **Max images:** 10 per product
- **Recommended size:** 1000x1000px or higher
- **Auto thumbnails:** 300x300 and 100x100 generated automatically

---

## Tips for Daily Management

1. **Organize images by date:**
   ```
   tools/uploads/images/2025-04-02/
   tools/uploads/images/2025-04-03/
   ```

2. **Use consistent naming:**
   - `saree-red-001.jpg`
   - `kurti-blue-002.jpg`

3. **Backup products.json** before each upload

4. **Test with 1-2 products** before bulk upload

---

## Troubleshooting

**Error: "Failed to authenticate"**
- Check admin email/password in .env

**Error: "Image not found"**
- Verify image path in products.json
- Check images exist in tools/uploads/images/

**Error: "Invalid category"**
- Use only: Sarees, Kurtis, Lehengas, Western Dresses, Daily Wear
