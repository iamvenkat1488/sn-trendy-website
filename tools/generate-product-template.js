/**
 * Product Template Generator
 * 
 * Quickly generate products.json template from image files
 * 
 * Usage: node tools/generate-product-template.js
 */

import { readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imagesDir = join(__dirname, 'uploads', 'images');

try {
    // Read all image files
    const files = readdirSync(imagesDir).filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    if (files.length === 0) {
        console.log('❌ No images found in tools/uploads/images/');
        console.log('   Add some images first, then run this script again.');
        process.exit(1);
    }

    console.log(`📸 Found ${files.length} images\n`);

    // Generate template
    const template = files.map((file, index) => ({
        name: `Product ${index + 1}`,
        description: 'Add product description here',
        price: 999,
        original_price: 1499,
        category: 'Sarees',  // Change to: Sarees, Kurtis, Lehengas, Western Dresses, Daily Wear
        sizes: ['Free Size'],  // Or: ['S', 'M', 'L', 'XL']
        colors: ['Red'],  // Add actual colors
        images: [file],
        rating: 4.5,
        reviews_count: 0,
        enabled: true
    }));

    // Save template
    const outputPath = join(__dirname, 'uploads', 'products-template.json');
    writeFileSync(outputPath, JSON.stringify(template, null, 2));

    console.log(`✅ Generated template: ${outputPath}`);
    console.log('\n📝 Next steps:');
    console.log('   1. Edit products-template.json with actual product details');
    console.log('   2. Rename to products.json');
    console.log('   3. Run: npm run upload-products');

} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
