import { getStore } from '@netlify/blobs';

if (!globalThis.__reservations) globalThis.__reservations = [];

export async function getReservations() {
    try {
        const store = getStore({ name: 'reservations', consistency: 'strong' });
        const list = await store.get('all', { type: 'json' });
        if (Array.isArray(list)) {
            globalThis.__reservations = list;
            return list;
        }
    } catch (e) {
        console.warn('Blobs read fallback:', e?.message || e);
    }
    return globalThis.__reservations;
}

export async function saveReservations(list) {
    globalThis.__reservations = list;
    try {
        const store = getStore({ name: 'reservations', consistency: 'strong' });
        await store.setJSON('all', list);
    } catch (e) {
        console.warn('Blobs write fallback:', e?.message || e);
    }
}
