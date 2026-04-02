/**
 * Export Users Script
 * 
 * Exports all user data to CSV/JSON for analysis
 * 
 * Usage: node tools/export-users.js
 */

import PocketBase from 'pocketbase';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || 'admin_password';

const pb = new PocketBase(POCKETBASE_URL);

async function exportUsers() {
    try {
        // Login as admin
        console.log('🔐 Logging in as admin...');
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Logged in successfully\n');

        // Fetch all users
        console.log('📥 Fetching users...');
        const users = await pb.collection('users').getFullList({
            sort: '-created',
        });

        console.log(`✅ Found ${users.length} users\n`);

        // Prepare data (remove sensitive info)
        const exportData = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            role: user.role,
            verified: user.verified,
            created: user.created,
            updated: user.updated,
            wishlist_count: user.wishlist_ids?.length || 0
        }));

        // Export to JSON
        const jsonPath = join(__dirname, 'exports', `users-${Date.now()}.json`);
        writeFileSync(jsonPath, JSON.stringify(exportData, null, 2));
        console.log(`✅ Exported to JSON: ${jsonPath}`);

        // Export to CSV
        const csvPath = join(__dirname, 'exports', `users-${Date.now()}.csv`);
        const headers = Object.keys(exportData[0]).join(',');
        const rows = exportData.map(user => 
            Object.values(user).map(val => 
                typeof val === 'string' && val.includes(',') ? `"${val}"` : val
            ).join(',')
        );
        const csv = [headers, ...rows].join('\n');
        writeFileSync(csvPath, csv);
        console.log(`✅ Exported to CSV: ${csvPath}`);

        // Print summary
        console.log('\n📊 User Summary:');
        console.log(`   Total Users: ${users.length}`);
        console.log(`   Verified: ${users.filter(u => u.verified).length}`);
        console.log(`   Admins: ${users.filter(u => u.role === 'admin').length}`);
        console.log(`   With Phone: ${users.filter(u => u.phone).length}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run export
exportUsers();
