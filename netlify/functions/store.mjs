const STORE_URL = 'https://api.restful-api.dev/objects/ff8081819f7e10ae019fd1b8c0697873';

if (!globalThis.__store) {
    globalThis.__store = {
        reservations: [],
        users: [
            { id: '1', username: 'admin', role: 'Super Admin', status: 'Active', createdAt: new Date().toISOString() }
        ]
    };
}

function mergeLists(listA = [], listB = []) {
    const map = new Map();
    [...listA, ...listB].forEach(item => {
        if (item && item.id) {
            if (!map.has(item.id)) {
                map.set(item.id, item);
            } else {
                const existing = map.get(item.id);
                map.set(item.id, { ...existing, ...item });
            }
        }
    });
    return Array.from(map.values());
}

export async function getStore() {
    try {
        const res = await fetch(STORE_URL, { headers: { 'Accept': 'application/json' } });
        if (res.ok) {
            const data = await res.json();
            if (data?.data) {
                if (Array.isArray(data.data.reservations)) {
                    globalThis.__store.reservations = mergeLists(globalThis.__store.reservations, data.data.reservations);
                }
                if (Array.isArray(data.data.users)) {
                    globalThis.__store.users = mergeLists(globalThis.__store.users, data.data.users);
                }
                return globalThis.__store;
            }
        }
    } catch (e) {
        console.warn('Cloud store read fallback:', e?.message || e);
    }
    return globalThis.__store;
}

export async function getReservations() {
    const store = await getStore();
    return store.reservations || [];
}

export async function saveReservations(list) {
    if (!globalThis.__store) globalThis.__store = {};
    globalThis.__store.reservations = mergeLists(globalThis.__store.reservations || [], list || []);
    await syncCloudStore();
}

export async function getUsers() {
    const store = await getStore();
    return store.users || [];
}

export async function saveUsers(list) {
    if (!globalThis.__store) globalThis.__store = {};
    globalThis.__store.users = mergeLists(globalThis.__store.users || [], list || []);
    await syncCloudStore();
}

async function syncCloudStore() {
    try {
        await fetch(STORE_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Arenguade Tela Store',
                data: {
                    reservations: globalThis.__store.reservations || [],
                    users: globalThis.__store.users || []
                }
            })
        });
    } catch (e) {
        console.warn('Cloud store write fallback:', e?.message || e);
    }
}
