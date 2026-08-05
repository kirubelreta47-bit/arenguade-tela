import crypto from 'crypto';
import { getUsers, saveUsers, getReservations } from './store.mjs';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin_secret_token_123';

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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

    const users = await getUsers();
    const reservations = await getReservations();

    // Aggregate customer contacts from reservations
    const customerMap = {};
    reservations.forEach(r => {
        const key = (r.phone || r.name || 'unknown').trim();
        if (!customerMap[key]) {
            customerMap[key] = {
                name: r.name || 'Anonymous',
                phone: r.phone || 'N/A',
                totalBookings: 0,
                confirmedBookings: 0,
                lastBooking: r.createdAt || r.date,
                preferredOccasion: r.occasion || 'General'
            };
        }
        customerMap[key].totalBookings += 1;
        if (r.status === 'confirmed' || r.status === 'arrived') {
            customerMap[key].confirmedBookings += 1;
        }
        if (r.createdAt && new Date(r.createdAt) > new Date(customerMap[key].lastBooking)) {
            customerMap[key].lastBooking = r.createdAt;
        }
    });

    const customerUsers = Object.values(customerMap);

    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                adminUsers: users,
                customerUsers: customerUsers
            })
        };
    }

    if (event.httpMethod === 'POST') {
        let body;
        try { body = JSON.parse(event.body || '{}'); } catch { body = {}; }

        const { username, role, password } = body;
        if (!username) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Username is required' }) };
        }

        const newUser = {
            id: crypto.randomUUID(),
            username,
            role: role || 'Admin',
            status: 'Active',
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await saveUsers(users);

        return { statusCode: 201, headers, body: JSON.stringify({ success: true, user: newUser }) };
    }

    if (event.httpMethod === 'DELETE') {
        const id = event.queryStringParameters?.id || event.path.split('/').pop();
        const filtered = users.filter(u => u.id !== id && u.username !== id);
        await saveUsers(filtered);
        return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
};
