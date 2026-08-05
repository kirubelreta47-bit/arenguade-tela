const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin_secret_token_123';
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function notifyTelegram(message) {
    if (!BOT_TOKEN || !CHAT_ID) return;
    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'HTML' })
        });
    } catch (e) {}
}

if (!globalThis.__reservations) globalThis.__reservations = [];

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.headers['x-api-key'] !== ADMIN_TOKEN) {
        return { statusCode: 403, headers, body: JSON.stringify({ error: 'Forbidden' }) };
    }

    const reservations = globalThis.__reservations;
    const id = event.queryStringParameters?.id;

    if (event.httpMethod === 'GET') {
        return { statusCode: 200, headers, body: JSON.stringify({ data: reservations }) };
    }

    if (event.httpMethod === 'PUT') {
        const index = reservations.findIndex(r => r.id === id);
        if (index === -1) return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) };

        let body;
        try { body = JSON.parse(event.body || '{}'); } catch { body = {}; }

        const oldStatus = reservations[index].status;
        const newStatus = body.status || oldStatus;
        reservations[index].status = newStatus;

        if (oldStatus !== newStatus) {
            await notifyTelegram(`🔄 <b>Reservation Update</b>\n\n${reservations[index].name}'s reservation is now: <b>${newStatus.toUpperCase()}</b>`);
        }

        return { statusCode: 200, headers, body: JSON.stringify({ success: true, reservation: reservations[index] }) };
    }

    if (event.httpMethod === 'DELETE') {
        const before = globalThis.__reservations.length;
        globalThis.__reservations = globalThis.__reservations.filter(r => r.id !== id);
        if (globalThis.__reservations.length === before) {
            return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) };
        }
        return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
};
