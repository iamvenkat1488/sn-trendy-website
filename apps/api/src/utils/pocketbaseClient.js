import dotenv from 'dotenv';
dotenv.config();
import Pocketbase from 'pocketbase';
import logger from './logger.js';

const pocketbaseClient = new Pocketbase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');

let authenticated = false;

async function ensureAuth() {
    if (authenticated && pocketbaseClient.authStore.isValid) return;

    const maxRetries = 5;
    for (let i = 1; i <= maxRetries; i++) {
        try {
            await pocketbaseClient.collection('_superusers').authWithPassword(
                process.env.PB_SUPERUSER_EMAIL,
                process.env.PB_SUPERUSER_PASSWORD,
            );
            authenticated = true;
            logger.info('PocketBase authenticated successfully');
            return;
        } catch (err) {
            logger.warn(`PocketBase auth attempt ${i}/${maxRetries} failed: ${err.message}`);
            if (i < maxRetries) await new Promise(r => setTimeout(r, 2000 * i));
        }
    }
    throw new Error('Could not authenticate with PocketBase after multiple attempts');
}

// Proxy so all collection calls auto-authenticate first
const pbProxy = new Proxy(pocketbaseClient, {
    get(target, prop) {
        if (prop === 'collection') {
            return (...args) => {
                const col = target.collection(...args);
                return new Proxy(col, {
                    get(colTarget, method) {
                        const original = colTarget[method];
                        if (typeof original !== 'function') return original;
                        return async (...methodArgs) => {
                            await ensureAuth();
                            return original.apply(colTarget, methodArgs);
                        };
                    }
                });
            };
        }
        return target[prop];
    }
});

export default pbProxy;
export { pbProxy as pocketbaseClient };
