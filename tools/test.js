import PocketBase from 'pocketbase';

const pb = new PocketBase('https://sn-trendy-pocketbase-dockerservice.onrender.com');

async function test() {
    try {
        console.log('Testing PocketBase connection...');
        
        const email = 'admin@sntrendycollections.in';
        const password = 'YOUR_PASSWORD_HERE'; // Replace with actual password
        
        console.log(`Attempting login with: ${email}`);
        
        const authData = await pb.admins.authWithPassword(email, password);
        
        console.log('✅ Login successful!');
        console.log('Admin ID:', authData.admin.id);
        console.log('Admin Email:', authData.admin.email);
        
    } catch (error) {
        console.error('❌ Login failed:', error.message);
        console.error('Full error:', error);
    }
}

test();
