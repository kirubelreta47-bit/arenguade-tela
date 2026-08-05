import { getReservations, saveReservations } from './store.mjs';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin_secret_token_123';
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function notifyTelegramUsers(reservation, newStatus) {
    if (!BOT_TOKEN) return;

    let customerChatId = reservation.telegram_chat_id || null;

    // Auto-detect specific customer's Telegram chat ID from getUpdates matching unique_code or phone
    if (!customerChatId) {
        try {
            const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
            if (res.ok) {
                const data = await res.json();
                if (data.ok && Array.isArray(data.result)) {
                    for (const update of data.result) {
                        const msgText = update.message?.text || '';
                        const chatId = update.message?.chat?.id;
                        if (chatId) {
                            const matchCode = reservation.unique_code && msgText.includes(reservation.unique_code);
                            const matchPhone = reservation.phone && msgText.replace(/\s+/g, '').includes(reservation.phone.replace(/\s+/g, ''));
                            if (matchCode || matchPhone) {
                                customerChatId = String(chatId);
                                reservation.telegram_chat_id = customerChatId;
                                break;
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.error('Error fetching Telegram updates for customer chat ID:', e);
        }
    }

    const statusUpper = newStatus.toUpperCase();

    // 1. Send status log update to Admin/Staff Telegram Chat ID
    if (CHAT_ID) {
        const adminMsg = `🔄 <b>Reservation Update</b>\n\nCustomer: <b>${reservation.name}</b> (${reservation.unique_code || 'N/A'})\nStatus: <b>${statusUpper}</b>\nPhone: <code>${reservation.phone}</code>`;
        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: CHAT_ID, text: adminMsg, parse_mode: 'HTML' })
            });
        } catch (e) {}
    }

    // 2. Send customer confirmation message ONLY to the specific customer who reserved
    if (customerChatId && String(customerChatId) !== String(CHAT_ID)) {
        let msg = '';
        if (newStatus === 'confirmed') {
            msg = `🎉 <b>RESERVATION CONFIRMED!</b>\n\nDear <b>${reservation.name}</b>,\nYour table reservation at <b>Arenguade Tela Cafe & Restaurant</b> has been <b>CONFIRMED</b>!\n\n📅 <b>Date:</b> ${reservation.date} ${reservation.time || ''}\n👥 <b>Guests:</b> ${reservation.guests || '1'}\n🔑 <b>Code:</b> <code>${reservation.unique_code || 'N/A'}</code>\n\nWe look forward to hosting you!`;
        } else if (newStatus === 'declined' || newStatus === 'cancelled') {
            msg = `❌ <b>RESERVATION UPDATE</b>\n\nDear <b>${reservation.name}</b>,\nYour table reservation request for <b>${reservation.date} ${reservation.time || ''}</b> has been <b>${statusUpper}</b>.\n\nPlease contact us directly if you have any questions.`;
        } else {
            msg = `🔄 <b>RESERVATION UPDATE</b>\n\nDear <b>${reservation.name}</b>,\nYour reservation status is now: <b>${statusUpper}</b>.`;
        }

        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: customerChatId, text: msg, parse_mode: 'HTML' })
            });
        } catch (e) {
            console.error(`Failed to send message to customer chat ${customerChatId}:`, e);
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
    
    // Extract ID from query string or URL path
    const pathLastSegment = event.path.split('/').pop();
    const id = event.queryStringParameters?.id || (pathLastSegment !== 'admin-reservations' && pathLastSegment !== 'reservations' ? pathLastSegment : null);

    if (event.httpMethod === 'GET') {
        return { statusCode: 200, headers, body: JSON.stringify({ data: reservations }) };
    }

    if (event.httpMethod === 'PUT') {
        const index = reservations.findIndex(r => r.id === id);
        if (index === -1) return { statusCode: 404, headers, body: JSON.stringify({ error: 'Reservation not found' }) };

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
            return { statusCode: 404, headers, body: JSON.stringify({ error: 'Reservation not found' }) };
        }
        await saveReservations(reservations);
        return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
};
