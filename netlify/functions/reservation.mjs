import crypto from 'crypto';
import { getReservations, saveReservations } from './store.mjs';

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

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    let data;
    try {
        data = JSON.parse(event.body || '{}');
    } catch {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
    }

    if (!data.name || !data.phone || !data.date) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Name, phone and date are required' }) };
    }

    const newReservation = {
        id: crypto.randomUUID(),
        unique_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    const reservations = await getReservations();
    reservations.push(newReservation);
    await saveReservations(reservations);

    await notifyTelegram(
        `🗓 <b>New Reservation!</b>\n\n<b>Name:</b> ${newReservation.name}\n<b>Phone:</b> ${newReservation.phone}\n<b>Date:</b> ${newReservation.date} ${newReservation.time || ''}\n<b>Guests:</b> ${newReservation.guests || '1'}\n<b>Occasion:</b> ${newReservation.occasion || 'N/A'}\n<b>Notes:</b> ${newReservation.notes || 'None'}\n<b>Code:</b> <code>${newReservation.unique_code}</code>`
    );

    return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ success: true, reservation: newReservation })
    };
};
