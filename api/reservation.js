import crypto from 'crypto';

// Telegram config
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
    } catch (e) {
        console.error('Telegram error:', e);
    }
}

// In-memory store (use a DB like Neon/Supabase for persistence in production)
// For now we use Vercel KV or fall back to a global cache
if (!globalThis.__reservations) globalThis.__reservations = [];

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { method } = req;
    const urlPath = req.url || '';

    // POST /api/reservation
    if (method === 'POST') {
        const data = req.body;
        if (!data || !data.name || !data.phone || !data.date) {
            return res.status(400).json({ error: 'Name, phone and date are required' });
        }
        const newReservation = {
            id: crypto.randomUUID(),
            unique_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
            ...data,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        globalThis.__reservations.push(newReservation);

        await notifyTelegram(
            `🗓 <b>New Reservation!</b>\n\n<b>Name:</b> ${newReservation.name}\n<b>Phone:</b> ${newReservation.phone}\n<b>Date:</b> ${newReservation.date} ${newReservation.time || ''}\n<b>Guests:</b> ${newReservation.guests || '1'}\n<b>Code:</b> <code>${newReservation.unique_code}</code>`
        );

        return res.status(201).json({ success: true, reservation: newReservation });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
