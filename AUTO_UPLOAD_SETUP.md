# 🎯 Final Setup - Automatic Product Upload

## What You Get

**Upload products in 3 steps:**
1. Rename images: `saree-red-2999.jpg`
2. Push to GitHub
3. Done! ✅

**No JSON files. No manual scripts. Fully automatic!**

---

## One-Time Setup (10 minutes)

### Step 1: Add GitHub Secrets

1. Go to: **GitHub.com** → Your repo `sn-trendy-website`
2. Click: **Settings** → **Secrets and variables** → **Actions**
3. Click: **New repository secret**
4. Add these **3 secrets**:

| Name | Value |
|------|-------|
| `POCKETBASE_URL` | `https://sn-trendy.pockethost.io` |
| `PB_ADMIN_EMAIL` | `your-admin@email.com` |
| `PB_ADMIN_PASSWORD` | `your-password` |

**Important:** Use your actual PocketBase admin credentials!

---

### Step 2: Commit New Files

```bash
# Commit the new automation files
git add .github/workflows/auto-upload-products.yml
git add tools/auto-upload-products.js
git add tools/package.json
git add SIMPLE_UPLOAD_GUIDE.md
git add IMAGE_NAMING_GUIDE.md
git commit -m "Add automatic product upload system"
git push origin main
```

---

### Step 3: Test It!

```bash
# 1. Add a test image
# Rename any image to: saree-red-test-999.jpg
# Copy it to: tools/uploads/images/

# 2. Push to GitHub
git add tools/uploads/images/
git commit -m "Test auto upload"
git push origin main

# 3. Check GitHub Actions
# Go to: GitHub → Actions tab
# You should see "Auto Upload Products" running

# 4. Wait 2-3 minutes

# 5. Check your website
# Visit: https://sntrendycollections.in
# Look in "New Arrivals" section
```

---

## Daily Usage (30 seconds)

### Every Morning:

```bash
# 1. Take product photos on phone
# 2. Transfer to computer
# 3. Rename files:
#    saree-red-silk-2999.jpg
#    kurti-blue-cotton-899.jpg
#    lehenga-pink-wedding-4999.jpg

# 4. Copy to folder
cp ~/Downloads/*.jpg tools/uploads/images/

# 5. Push to GitHub
git add tools/uploads/images/
git commit -m "Add new products $(date +%Y-%m-%d)"
git push origin main

# ✅ Done! Products appear in 3 minutes
```

---

## Image Naming Rules

### Format: `category-name-price.jpg`

**Categories:**
- `saree` → Sarees
- `kurti` → Kurtis
- `lehenga` → Lehengas
- `dress` → Western Dresses
- `daily` → Daily Wear

**Examples:**
```
✅ saree-red-silk-2999.jpg
✅ kurti-blue-cotton-899.jpg
✅ lehenga-pink-wedding-4999.jpg
✅ dress-green-party-1499.jpg
✅ daily-white-casual-599.jpg

❌ IMG_1234.jpg (no info)
❌ red-saree.jpg (no price)
```

**Multiple images for same product:**
```
saree-red-silk-2999.jpg
saree-red-silk-2999-2.jpg
saree-red-silk-2999-3.jpg
```
→ Creates 1 product with 3 images!

---

## What Happens Automatically

When you push images to GitHub:

1. ✅ GitHub Actions detects new images
2. ✅ Runs upload script automatically
3. ✅ Extracts product info from filenames
4. ✅ Detects category, name, price, colors
5. ✅ Assigns default sizes
6. ✅ Groups multiple images
7. ✅ Uploads to PocketBase
8. ✅ Products appear on website

**You just upload images!** Everything else is automatic.

---

## Monitoring

### Check Upload Status:

**GitHub Actions:**
- Go to: GitHub → Your repo → **Actions** tab
- See: "Auto Upload Products" workflow
- Green ✅ = Success
- Red ❌ = Error (click to see details)

**Website:**
- Visit: https://sntrendycollections.in
- Check: "New Arrivals" section
- Products appear in 3-5 minutes

**PocketBase Admin:**
- Visit: https://sn-trendy.pockethost.io/_/
- Collections → products
- See all uploaded products

---

## Troubleshooting

### GitHub Actions not running?
- Check: Settings → Actions → General
- Enable: "Allow all actions and reusable workflows"

### "Secrets not found" error?
- Check: Settings → Secrets → Actions
- Verify all 3 secrets are added correctly

### Products not appearing?
- Check GitHub Actions tab for errors
- Verify image naming format
- Check PocketBase admin panel

### Want to test locally first?
```bash
cd tools
npm install
npm run auto-upload
```

---

## Comparison

### Old Way (Manual):
```
1. Add images to folder
2. Create products.json
3. Fill in all details manually
4. Run npm install
5. Run upload script
6. Fix errors
7. Repeat
```
**Time:** 30 minutes for 10 products

### New Way (Automatic):
```
1. Rename images: category-name-price.jpg
2. git push
3. Done!
```
**Time:** 1 minute for 50 products

---

## Advanced: Batch Upload

Upload 100 products at once:

```bash
# 1. Organize images
tools/uploads/images/
├── saree-red-001-2999.jpg
├── saree-blue-002-2999.jpg
├── saree-green-003-2999.jpg
... (100 files)

# 2. One push
git add tools/uploads/images/
git commit -m "Add 100 new sarees"
git push

# ✅ All 100 products uploaded automatically!
```

---

## Summary

**Setup once (10 mins):**
- Add GitHub Secrets
- Commit automation files
- Test with one image

**Use daily (30 seconds):**
- Rename images
- Push to GitHub
- Done!

**No more:**
- ❌ JSON files
- ❌ Manual data entry
- ❌ Running scripts
- ❌ npm install

**Just:**
- ✅ Rename images
- ✅ Push to GitHub
- ✅ Automatic upload!

---

## 📚 Documentation

- **Simple Guide:** `SIMPLE_UPLOAD_GUIDE.md`
- **Naming Guide:** `IMAGE_NAMING_GUIDE.md`
- **Full Management:** `MANAGEMENT_GUIDE.md`

---

**Ready to start?** Follow Step 1 above to add GitHub Secrets! 🚀
