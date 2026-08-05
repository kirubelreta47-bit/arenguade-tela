const STORE_URL = 'https://api.restful-api.dev/objects/ff8081819f7e10ae019fd1b8c0697873';

if (!globalThis.__reservations) globalThis.__reservations = [];

export async function getReservations() {
    try {
        const res = await fetch(STORE_URL, { headers: { 'Accept': 'application/json' } });
        if (res.ok) {
            const data = await res.json();
            const list = data?.data?.reservations;
            if (Array.isArray(list)) {
                globalThis.__reservations = list;
                return list;
            }
        }
    } catch (e) {
        console.warn('Cloud store read fallback:', e?.message || e);
    }
    return globalThis.__reservations;
}

export async function saveReservations(list) {
    globalThis.__reservations = list;
    try {
        await fetch(STORE_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Arenguade Tela Store',
                data: { reservations: list }
            })
        });
    } catch (e) {
        console.warn('Cloud store write fallback:', e?.message || e);
    }
}
