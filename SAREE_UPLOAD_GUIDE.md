# 🛍️ How to Upload Sarees to Your Website

## 📋 Three Easy Methods

---

## Method 1: Automated Upload (Fastest) ⚡

### Step 1: Rename Your Images
Rename your saree images following this pattern:
```
saree-description-price.jpg
```

**Examples:**
- `saree-red-silk-2999.jpg`
- `saree-blue-cotton-1499.jpg`
- `saree-golden-banarasi-4999.jpg`
- `saree-green-georgette-1999.jpg`

**For multiple images of same saree:**
- `saree-red-silk-2999-front.jpg`
- `saree-red-silk-2999-back.jpg`
- `saree-red-silk-2999-model.jpg`

### Step 2: Upload to GitHub
1. Place all renamed images in `product-images/` folder
2. Commit and push to GitHub
3. GitHub Actions will automatically upload them to your website!

---

## Method 2: Manual Script Upload 📝

### Step 1: Edit the Upload Script
Open `tools/upload-sarees.js` and update the sarees array:

```javascript
const sarees = [
  {
    name: 'Red Silk Saree',
    description: 'Beautiful red silk saree perfect for weddings',
    price: 2999,
    originalPrice: 3999,
    colors: ['Red', 'Maroon'],
    sizes: [{ size: 'Free Size', stock: 10 }],
    images: ['saree-red-silk-1.jpg', 'saree-red-silk-2.jpg'],
    tags: ['New Arrival', 'Trending']
  },
  {
    name: 'Blue Cotton Saree',
    description: 'Comfortable blue cotton saree for daily wear',
    price: 1499,
    originalPrice: 1999,
    colors: ['Blue', 'Sky Blue'],
    sizes: [{ size: 'Free Size', stock: 15 }],
    images: ['saree-blue-cotton-1.jpg'],
    tags: ['Best Seller']
  }
  // Add more sarees...
];
```

### Step 2: Place Images
Put all your saree images in `product-images/` folder

### Step 3: Run the Script
```bash
node tools/upload-sarees.js
```

The script will:
- ✅ Upload all sarees to PocketBase
- 💰 Show price and colors
- 🔗 Generate WhatsApp links for each saree

---

## Method 3: Admin Dashboard (Manual) 🖥️

### Step 1: Login to Admin
1. Go to `https://sntrendycollections.in/admin`
2. Login with admin credentials

### Step 2: Add Product
1. Click "Add Product" button
2. Fill in details:
   - **Name**: Red Silk Saree
   - **Category**: Sarees
   - **Price**: 2999
   - **Original Price**: 3999 (optional)
   - **Description**: Beautiful red silk saree...
   - **Colors**: Red, Maroon
   - **Sizes**: Free Size (Stock: 10)
   - **Tags**: New Arrival, Trending
3. Upload images (up to 10 images)
4. Enable product
5. Click Save

---

## 🎨 Color Options for Sarees

Common saree colors you can use:
- Red, Maroon, Crimson
- Blue, Navy Blue, Sky Blue
- Green, Emerald, Olive
- Yellow, Golden, Mustard
- Pink, Rose, Magenta
- Orange, Peach, Coral
- Purple, Violet, Lavender
- White, Cream, Ivory
- Black, Grey, Silver

---

## 🏷️ Tags You Can Use

- **New Arrival** - Shows "NEW" badge
- **Trending** - Shows "🔥 TRENDING" badge
- **Best Seller** - Shows "⭐ BEST SELLER" badge
- **Sale** - Shows discount percentage badge
- **Featured** - For homepage featured section

---

## 📱 WhatsApp Integration

### How It Works:
1. Customer views saree on website
2. Clicks "Order on WhatsApp" button
3. WhatsApp opens with pre-filled message:
   ```
   Hi! I want to order:
   
   📦 Product: Red Silk Saree
   💰 Price: ₹2999
   📏 Size: Free Size
   🎨 Color: Red
   🔢 Quantity: 1
   
   Total: ₹2,999
   
   Please confirm availability and delivery details.
   ```
4. You receive the order on WhatsApp
5. Confirm and arrange delivery/payment

### Update WhatsApp Number:
Edit `apps/web/src/config/siteConfig.js`:
```javascript
whatsapp: {
  enabled: true,
  phoneNumber: '919876543210', // Your number with country code
  defaultMessage: 'Hi! I am interested in your products.',
}
```

---

## 💡 Tips for Best Results

### Image Guidelines:
- ✅ Use high-quality images (at least 800x800px)
- ✅ Show saree from multiple angles (front, back, drape)
- ✅ Include model wearing the saree if possible
- ✅ Use good lighting and clean background
- ✅ Keep file size under 5MB per image

### Pricing Strategy:
- Set `originalPrice` higher than `price` to show discount
- Example: Price: ₹2999, Original: ₹3999 = 25% OFF badge

### Stock Management:
- Set realistic stock numbers
- Low stock (< 5) shows "Low stock" warning
- Zero stock disables the size option

---

## 🚀 Quick Start Example

### Upload 5 Sarees in 2 Minutes:

1. **Rename images:**
   ```
   saree-red-silk-2999.jpg
   saree-blue-cotton-1499.jpg
   saree-green-georgette-1999.jpg
   saree-pink-chiffon-1799.jpg
   saree-yellow-banarasi-3499.jpg
   ```

2. **Place in folder:**
   ```
   product-images/
   ├── saree-red-silk-2999.jpg
   ├── saree-blue-cotton-1499.jpg
   ├── saree-green-georgette-1999.jpg
   ├── saree-pink-chiffon-1799.jpg
   └── saree-yellow-banarasi-3499.jpg
   ```

3. **Push to GitHub:**
   ```bash
   git add product-images/
   git commit -m "Add 5 new sarees"
   git push
   ```

4. **Done!** ✅ Check your website in 2-3 minutes

---

## 📞 Need Help?

If you face any issues:
1. Check GitHub Actions logs for errors
2. Verify PocketBase is running
3. Ensure images are in correct format (JPG/PNG)
4. Check environment variables are set

---

## 🎯 What Customers See

When customers browse sarees:
- ✨ Beautiful product cards with hover effects
- 🏷️ Badges (NEW, TRENDING, SALE)
- 💰 Price with discount percentage
- 🎨 Color swatches
- ⭐ Ratings and reviews
- 📱 WhatsApp order button
- 🛒 Add to cart option

---

**Ready to upload your sarees? Choose the method that works best for you!** 🚀
