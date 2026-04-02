/**
 * Bulk Product Upload Script
 * 
 * Usage:
 * 1. Place product images in: tools/uploads/images/
 * 2. Create products.json with product data
 * 3. Run: node tools/bulk-upload-products.js
 */

import PocketBase from 'pocketbase';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || 'admin_password';

const pb = new PocketBase(POCKETBASE_URL);

/**
 * Example products.json format:
 * [
 *   {
 *     "name": "Beautiful Red Saree",
 *     "description": "Elegant silk saree perfect for weddings",
 *     "price": 2999,
 *     "original_price": 4999,
 *     "category": "Sarees",
 *     "sizes": ["Free Size"],
 *     "colors": ["Red", "Maroon"],
 *     "images": ["saree1-img1.jpg", "saree1-img2.jpg"],
 *     "tags": ["New Arrival", "Trending"],
 *     "enabled": true
 *   }
 * ]
 */

async function uploadProducts() {
    try {
        // Login as admin
        console.log('🔐 Logging in as admin...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Logged in successfully\n');

        // Read products data
        const productsFile = join(__dirname, 'uploads', 'products.json');
        const products = JSON.parse(readFileSync(productsFile, 'utf-8'));

        console.log(`📦 Found ${products.length} products to upload\n`);

        // Upload each product
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            console.log(`[${i + 1}/${products.length}] Uploading: ${product.name}`);

            try {
                // Prepare form data
                const formData = new FormData();
                formData.append('name', product.name);
                formData.append('description', product.description || '');
                formData.append('price', product.price);
                formData.append('original_price', product.original_price || product.price);
                formData.append('category', product.category);
                formData.append('sizes', JSON.stringify(product.sizes));
                formData.append('colors', JSON.stringify(product.colors || []));
                formData.append('enabled', product.enabled !== false);
                formData.append('rating', product.rating || 0);
                formData.append('reviews_count', product.reviews_count || 0);
                
                // Add tags if provided
                if (product.tags && product.tags.length > 0) {
                    formData.append('tags', JSON.stringify(product.tags));
                }

                // Add images
                if (product.images && product.images.length > 0) {
                    for (const imageName of product.images) {
                        const imagePath = join(__dirname, 'uploads', 'images', imageName);
                        const imageBlob = new Blob([readFileSync(imagePath)]);
                        formData.append('images', imageBlob, imageName);
                    }
                }

                // Create product record
                const record = await pb.collection('products').create(formData);
                console.log(`   ✅ Created product ID: ${record.id}`);

            } catch (error) {
                console.error(`   ❌ Error uploading ${product.name}:`, error.message);
            }
        }

        console.log('\n🎉 Bulk upload completed!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run the upload
uploadProducts();
