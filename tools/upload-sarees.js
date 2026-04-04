/**
 * Quick Saree Upload Script
 * 
 * Usage:
 * 1. Place your saree images in a folder
 * 2. Update the sarees array below with your saree details
 * 3. Run: node tools/upload-sarees.js
 */

import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PocketBase configuration
const POCKETBASE_URL = process.env.POCKETBASE_URL || 'https://sn-trendy-pocketbase-dockerservice.onrender.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sntrendy.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123456';

// WhatsApp configuration
const WHATSAPP_NUMBER = '919876543210'; // Update with your WhatsApp number

const pb = new PocketBase(POCKETBASE_URL);

// Define your sarees here
const sarees = [
  {
    name: 'Red Silk Saree',
    description: 'Beautiful red silk saree perfect for weddings and festivals',
    price: 2999,
    originalPrice: 3999,
    colors: ['Red', 'Maroon'],
    sizes: [{ size: 'Free Size', stock: 10 }],
    images: ['saree-red-silk-1.jpg', 'saree-red-silk-2.jpg'], // Place images in product-images folder
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
  },
  {
    name: 'Golden Banarasi Saree',
    description: 'Premium golden banarasi saree with intricate work',
    price: 4999,
    originalPrice: 6999,
    colors: ['Golden', 'Gold'],
    sizes: [{ size: 'Free Size', stock: 5 }],
    images: ['saree-golden-banarasi-1.jpg', 'saree-golden-banarasi-2.jpg'],
    tags: ['New Arrival', 'Featured']
  }
  // Add more sarees here...
];

async function uploadSarees() {
  try {
    console.log('🔐 Authenticating with PocketBase...');
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Authenticated successfully\n');

    const imagesFolder = path.join(__dirname, '..', 'product-images');
    
    if (!fs.existsSync(imagesFolder)) {
      console.log('📁 Creating product-images folder...');
      fs.mkdirSync(imagesFolder, { recursive: true });
    }

    let successCount = 0;
    let errorCount = 0;

    for (const saree of sarees) {
      try {
        console.log(`📤 Uploading: ${saree.name}...`);

        // Prepare form data
        const formData = new FormData();
        formData.append('name', saree.name);
        formData.append('description', saree.description);
        formData.append('price', saree.price);
        formData.append('original_price', saree.originalPrice || saree.price);
        formData.append('category', 'Sarees');
        formData.append('colors', JSON.stringify(saree.colors));
        formData.append('sizes', JSON.stringify(saree.sizes));
        formData.append('tags', JSON.stringify(saree.tags || []));
        formData.append('rating', 4.5);
        formData.append('reviews_count', Math.floor(Math.random() * 50) + 10);
        formData.append('enabled', true);

        // Add images
        for (const imageName of saree.images) {
          const imagePath = path.join(imagesFolder, imageName);
          if (fs.existsSync(imagePath)) {
            const imageBlob = new Blob([fs.readFileSync(imagePath)]);
            formData.append('images', imageBlob, imageName);
          } else {
            console.log(`   ⚠️  Image not found: ${imageName}`);
          }
        }

        // Create product
        const record = await pb.collection('products').create(formData);
        
        // Generate WhatsApp link
        const whatsappMessage = `Hi! I'm interested in ${saree.name} (₹${saree.price}). Product ID: ${record.id}`;
        const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
        
        console.log(`   ✅ Uploaded successfully!`);
        console.log(`   🔗 WhatsApp Link: ${whatsappLink}`);
        console.log(`   💰 Price: ₹${saree.price}`);
        console.log(`   🎨 Colors: ${saree.colors.join(', ')}\n`);
        
        successCount++;
      } catch (error) {
        console.error(`   ❌ Error uploading ${saree.name}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n📊 Upload Summary:');
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${errorCount}`);
    console.log(`   📦 Total: ${sarees.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the upload
uploadSarees();
