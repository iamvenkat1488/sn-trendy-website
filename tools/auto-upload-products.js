/**
 * Auto Product Upload - Zero Configuration
 * 
 * Just add images to tools/uploads/images/ and run this script
 * Product details are extracted from image filenames
 * 
 * Filename format: category-name-price.jpg
 * Example: saree-red-silk-2999.jpg
 *          kurti-blue-cotton-899.jpg
 */

import PocketBase from 'pocketbase';
import { readdirSync, readFileSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const POCKETBASE_URL = process.env.POCKETBASE_URL || 'https://sn-trendy-pocketbase-dockerservice.onrender.com';
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'admin@sntrendycollections.in';
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || 'Qwerty@1234';

const pb = new PocketBase(POCKETBASE_URL);

// Category mapping
const CATEGORY_MAP = {
    'saree': 'Sarees',
    'sarees': 'Sarees',
    'kurti': 'Kurtis',
    'kurtis': 'Kurtis',
    'lehenga': 'Lehengas',
    'lehengas': 'Lehengas',
    'dress': 'Western Dresses',
    'dresses': 'Western Dresses',
    'western': 'Western Dresses',
    'daily': 'Daily Wear',
    'dailywear': 'Daily Wear'
};

// Default sizes by category
const DEFAULT_SIZES = {
    'Sarees': ['Free Size'],
    'Kurtis': ['S', 'M', 'L', 'XL', 'XXL'],
    'Lehengas': ['S', 'M', 'L', 'XL'],
    'Western Dresses': ['XS', 'S', 'M', 'L', 'XL'],
    'Daily Wear': ['S', 'M', 'L', 'XL']
};

/**
 * Parse filename to extract product info
 * Format: category-name-price.jpg
 * Example: saree-red-silk-2999.jpg
 */
function parseFilename(filename) {
    const nameWithoutExt = basename(filename, extname(filename));
    const parts = nameWithoutExt.split('-');
    
    if (parts.length < 2) {
        return null;
    }

    // First part is category
    const categoryKey = parts[0].toLowerCase();
    const category = CATEGORY_MAP[categoryKey] || 'Sarees';
    
    // Last part might be price (if it's a number)
    const lastPart = parts[parts.length - 1];
    const price = /^\d+$/.test(lastPart) ? parseInt(lastPart) : 999;
    
    // Middle parts are product name
    const nameParts = /^\d+$/.test(lastPart) ? parts.slice(1, -1) : parts.slice(1);
    const name = nameParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    
    // Extract color from name if possible
    const colors = extractColors(name);
    
    return {
        name: name || 'New Product',
        category,
        price,
        colors,
        sizes: DEFAULT_SIZES[category]
    };
}

/**
 * Extract color names from product name
 */
function extractColors(name) {
    const colorKeywords = ['red', 'blue', 'green', 'yellow', 'pink', 'black', 'white', 
                          'purple', 'orange', 'brown', 'grey', 'gray', 'maroon', 
                          'navy', 'golden', 'silver', 'beige', 'cream'];
    
    const colors = [];
    const nameLower = name.toLowerCase();
    
    for (const color of colorKeywords) {
        if (nameLower.includes(color)) {
            colors.push(color.charAt(0).toUpperCase() + color.slice(1));
        }
    }
    
    return colors.length > 0 ? colors : ['Multi'];
}

/**
 * Group images by product (images with same prefix)
 */
function groupImagesByProduct(files) {
    const groups = {};
    
    for (const file of files) {
        const parsed = parseFilename(file);
        if (!parsed) continue;
        
        // Use first 3 parts of filename as product key
        const nameWithoutExt = basename(file, extname(file));
        const parts = nameWithoutExt.split('-');
        const key = parts.slice(0, 3).join('-');
        
        if (!groups[key]) {
            groups[key] = {
                ...parsed,
                images: []
            };
        }
        
        groups[key].images.push(file);
    }
    
    return Object.values(groups);
}

async function autoUploadProducts() {
    try {
        console.log('🤖 Auto Product Upload Starting...\n');
        
        // Login as admin
        console.log('🔐 Logging in...');
        try {
            await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
            console.log('✅ Logged in\n');
        } catch (authError) {
            console.error('❌ Login failed:', authError.message);
            console.log('\nPlease check:');
            console.log('1. PocketBase URL:', POCKETBASE_URL);
            console.log('2. Admin Email:', ADMIN_EMAIL);
            console.log('3. Admin Password is set correctly');
            process.exit(1);
        }

        // Read images
        const imagesDir = join(__dirname, 'uploads', 'images');
        const files = readdirSync(imagesDir).filter(file => 
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        );

        if (files.length === 0) {
            console.log('❌ No images found in tools/uploads/images/');
            console.log('   Add some images and try again!');
            process.exit(1);
        }

        console.log(`📸 Found ${files.length} images\n`);

        // Group images by product
        const products = groupImagesByProduct(files);
        console.log(`📦 Detected ${products.length} products\n`);

        // Upload each product
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            console.log(`[${i + 1}/${products.length}] Uploading: ${product.name}`);
            console.log(`   Category: ${product.category}`);
            console.log(`   Price: ₹${product.price}`);
            console.log(`   Images: ${product.images.length}`);

            try {
                const formData = new FormData();
                formData.append('name', product.name);
                formData.append('description', `Beautiful ${product.name.toLowerCase()} from SN Trendy Collections`);
                formData.append('price', product.price);
                formData.append('original_price', Math.round(product.price * 1.5)); // 50% markup
                formData.append('category', product.category);
                formData.append('sizes', JSON.stringify(product.sizes.map(size => ({ size, stock: 10 }))));
                formData.append('colors', JSON.stringify(product.colors));
                formData.append('tags', JSON.stringify(['New Arrival']));
                formData.append('enabled', true);
                formData.append('rating', 4.5);
                formData.append('reviews_count', 0);

                // Add images
                for (const imageName of product.images) {
                    const imagePath = join(imagesDir, imageName);
                    const imageBuffer = readFileSync(imagePath);
                    const imageBlob = new Blob([imageBuffer]);
                    formData.append('images', imageBlob, imageName);
                }

                const record = await pb.collection('products').create(formData);
                console.log(`   ✅ Created! ID: ${record.id}\n`);

            } catch (error) {
                console.error(`   ❌ Error: ${error.message}\n`);
            }
        }

        console.log('🎉 Auto upload completed!\n');
        console.log('📝 Filename Format Tips:');
        console.log('   saree-red-silk-2999.jpg     → Saree, Red Silk, ₹2999');
        console.log('   kurti-blue-cotton-899.jpg   → Kurti, Blue Cotton, ₹899');
        console.log('   dress-green-party-1499.jpg  → Dress, Green Party, ₹1499');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run
autoUploadProducts();
