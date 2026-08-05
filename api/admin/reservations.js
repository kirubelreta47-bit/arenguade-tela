import crypto from 'crypto';

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

function auth(req) {
    return req.headers['x-api-key'] === ADMIN_TOKEN;
}

if (!globalThis.__reservations) globalThis.__reservations = [];

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (!auth(req)) return res.status(403).json({ error: 'Forbidden' });

    const reservations = globalThis.__reservations;

    // GET all
    if (req.method === 'GET') {
        return res.status(200).json({ data: reservations });
    }

    // PUT /api/admin/reservations?id=xxx
    if (req.method === 'PUT') {
        const id = req.query.id;
        const index = reservations.findIndex(r => r.id === id);
        if (index === -1) return res.status(404).json({ error: 'Not found' });

        const oldStatus = reservations[index].status;
        const newStatus = req.body?.status || oldStatus;
        reservations[index].status = newStatus;

        if (oldStatus !== newStatus) {
            await notifyTelegram(`🔄 <b>Reservation Update</b>\n\n${reservations[index].name}'s reservation is now: <b>${newStatus.toUpperCase()}</b>`);
        }
        return res.status(200).json({ success: true, reservation: reservations[index] });
    }

    // DELETE /api/admin/reservations?id=xxx
    if (req.method === 'DELETE') {
        const id = req.query.id;
        const before = reservations.length;
        globalThis.__reservations = reservations.filter(r => r.id !== id);
        if (globalThis.__reservations.length === before) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
