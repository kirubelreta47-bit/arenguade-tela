import { getReservations, saveReservations } from './store.mjs';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin_secret_token_123';
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function notifyTelegramUsers(reservation, newStatus) {
    if (!BOT_TOKEN) return;

    const chatIds = new Set();
    if (CHAT_ID) chatIds.add(String(CHAT_ID));

    // Fetch updates to get all user chat IDs who started/messaged the bot
    try {
        const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
        if (res.ok) {
            const data = await res.json();
            if (data.ok && Array.isArray(data.result)) {
                for (const update of data.result) {
                    const id = update.message?.chat?.id || update.my_chat_member?.chat?.id;
                    if (id) chatIds.add(String(id));
                }
            }
        }
    } catch (e) {
        console.error('Error fetching Telegram updates:', e);
    }

    const statusUpper = newStatus.toUpperCase();
    let msg = '';

    if (newStatus === 'confirmed') {
        msg = `🎉 <b>RESERVATION CONFIRMED!</b>\n\nDear <b>${reservation.name}</b>,\nYour table reservation at <b>Arenguade Tela Cafe & Restaurant</b> has been <b>CONFIRMED</b>!\n\n📅 <b>Date:</b> ${reservation.date} ${reservation.time || ''}\n👥 <b>Guests:</b> ${reservation.guests || '1'}\n🔑 <b>Code:</b> <code>${reservation.unique_code || 'N/A'}</code>\n\nWe look forward to hosting you!`;
    } else if (newStatus === 'declined' || newStatus === 'cancelled') {
        msg = `❌ <b>RESERVATION UPDATE</b>\n\nDear <b>${reservation.name}</b>,\nYour table reservation request for <b>${reservation.date} ${reservation.time || ''}</b> has been <b>${statusUpper}</b>.\n\nPlease contact us directly if you have any questions.`;
    } else {
        msg = `🔄 <b>RESERVATION UPDATE</b>\n\nDear <b>${reservation.name}</b>,\nYour reservation status is now: <b>${statusUpper}</b>.`;
    }

    // Send confirmation message to all bot users + admin
    for (const id of chatIds) {
        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: id,
                    text: msg,
                    parse_mode: 'HTML'
                })
            });
        } catch (e) {
            console.error(`Failed to send message to Telegram chat ${id}:`, e);
        }
    }
}

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

    const apiKeyHeader = Object.keys(event.headers || {}).find(k => k.toLowerCase() === 'x-api-key');
    const providedToken = apiKeyHeader ? event.headers[apiKeyHeader] : null;

    if (providedToken !== ADMIN_TOKEN) {
        return { statusCode: 403, headers, body: JSON.stringify({ error: 'Forbidden' }) };
    }

    let reservations = await getReservations();
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

        await saveReservations(reservations);

        if (oldStatus !== newStatus) {
            await notifyTelegramUsers(reservations[index], newStatus);
        }

        return { statusCode: 200, headers, body: JSON.stringify({ success: true, reservation: reservations[index] }) };
    }

    if (event.httpMethod === 'DELETE') {
        const before = reservations.length;
        reservations = reservations.filter(r => r.id !== id);
        if (reservations.length === before) {
            return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) };
        }
        await saveReservations(reservations);
        return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
};
