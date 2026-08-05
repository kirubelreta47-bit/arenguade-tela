import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import 'dotenv/config';
import { getReservations as getCloudReservations, saveReservations as saveCloudReservations, getUsers as getCloudUsers, saveUsers as saveCloudUsers } from './netlify/functions/store.mjs';

// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
let dynamicChatId = process.env.TELEGRAM_CHAT_ID;

const notifyTelegramAdmin = async (message) => {
    if (!TELEGRAM_BOT_TOKEN) return;

    if (!dynamicChatId) {
        try {
            const upRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
            const upData = await upRes.json();
            if (upData.ok && upData.result.length > 0) {
                const lastMessage = upData.result[upData.result.length - 1];
                dynamicChatId = lastMessage.message?.chat?.id || lastMessage.my_chat_member?.chat?.id;
            }
        } catch(e) {
            console.error('Failed auto-detect chat ID:', e);
        }
    }

    if (!dynamicChatId) return;

    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: dynamicChatId, text: message, parse_mode: 'HTML' })
        });
    } catch (err) {
        console.error('Failed to send Telegram admin message:', err);
    }
};

const notifyTelegramCustomer = async (reservation, newStatus) => {
    if (!TELEGRAM_BOT_TOKEN) return;

    let customerChatId = reservation.telegram_chat_id || null;

    // Detect customer chat ID from getUpdates matching unique_code or phone
    if (!customerChatId) {
        try {
            const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
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
            console.error('Error auto-detecting customer chat ID:', e);
        }
    }

    const statusUpper = newStatus.toUpperCase();

    // 1. Notify Admin Chat
    notifyTelegramAdmin(`🔄 <b>Reservation Update</b>\n\nCustomer: <b>${reservation.name}</b> (${reservation.unique_code || 'N/A'})\nStatus: <b>${statusUpper}</b>`);

    // 2. Notify ONLY the specific customer who booked
    if (customerChatId && String(customerChatId) !== String(dynamicChatId)) {
        let msg = '';
        if (newStatus === 'confirmed') {
            msg = `🎉 <b>RESERVATION CONFIRMED!</b>\n\nDear <b>${reservation.name}</b>,\nYour table reservation at <b>Arenguade Tela Cafe & Restaurant</b> has been <b>CONFIRMED</b>!\n\n📅 <b>Date:</b> ${reservation.date} ${reservation.time || ''}\n👥 <b>Guests:</b> ${reservation.guests || '1'}\n🔑 <b>Code:</b> <code>${reservation.unique_code || 'N/A'}</code>\n\nWe look forward to hosting you!`;
        } else if (newStatus === 'declined' || newStatus === 'cancelled') {
            msg = `❌ <b>RESERVATION UPDATE</b>\n\nDear <b>${reservation.name}</b>,\nYour table reservation request for <b>${reservation.date} ${reservation.time || ''}</b> has been <b>${statusUpper}</b>.\n\nPlease contact us directly if you have any questions.`;
        } else {
            msg = `🔄 <b>RESERVATION UPDATE</b>\n\nDear <b>${reservation.name}</b>,\nYour reservation status is now: <b>${statusUpper}</b>.`;
        }

        try {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: customerChatId, text: msg, parse_mode: 'HTML' })
            });
        } catch (e) {
            console.error(`Failed to send customer notification to ${customerChatId}:`, e);
        }
    }
};

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = './reservations.json';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin_secret_token_123';

app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-api-key');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// Serve static frontend files directly from local server
app.use(express.static('.'));

app.get('/admin', (req, res) => {
    res.sendFile(path.resolve('./admin.html'));
});

const readLocalData = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (e) {
        return [];
    }
};

const writeLocalData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch(e) {
        console.error('Failed to write local reservations.json:', e);
    }
};

function mergeReservationsLists(listA = [], listB = []) {
    const map = new Map();
    [...listA, ...listB].forEach(r => {
        if (r && r.id) {
            if (!map.has(r.id)) {
                map.set(r.id, r);
            } else {
                const existing = map.get(r.id);
                map.set(r.id, { ...existing, ...r });
            }
        }
    });
    return Array.from(map.values());
}

// Unified helper to get latest merged reservations
const getReservations = async () => {
    const local = readLocalData();
    try {
        const cloudData = await getCloudReservations();
        const merged = mergeReservationsLists(local, cloudData);
        writeLocalData(merged);
        return merged;
    } catch(e) {
        console.warn('Cloud read error, using local file:', e);
    }
    return local;
};

// Unified helper to save reservations
const saveReservations = async (data) => {
    const local = readLocalData();
    const merged = mergeReservationsLists(local, data);
    writeLocalData(merged);
    try {
        await saveCloudReservations(merged);
    } catch(e) {
        console.warn('Cloud write error:', e);
    }
};

app.post('/api/reservation', async (req, res) => {
    const data = req.body;
    if (!data.name || !data.phone || !data.date) {
        return res.status(400).json({ error: 'Name, phone and date are required' });
    }
    const reservations = await getReservations();
    const newReservation = {
        id: crypto.randomUUID(),
        unique_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    reservations.push(newReservation);
    await saveReservations(reservations);
    
    notifyTelegramAdmin(`🗓 <b>New Reservation!</b>\n\n<b>Name:</b> ${newReservation.name}\n<b>Phone:</b> ${newReservation.phone}\n<b>Date:</b> ${newReservation.date} ${newReservation.time || ''}\n<b>Guests:</b> ${newReservation.guests || '1'}\n<b>Code:</b> <code>${newReservation.unique_code}</code>`);
    
    res.status(201).json({ success: true, reservation: newReservation });
});

app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (username === validUsername && password === validPassword) {
        res.json({ success: true, token: ADMIN_TOKEN });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

const auth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.api_key;
    if (apiKey === ADMIN_TOKEN) return next();
    res.status(403).json({ error: 'Forbidden' });
};

app.get('/api/admin/reservations', auth, async (req, res) => {
    const data = await getReservations();
    res.json({ data });
});

app.put(['/api/admin/reservations/:id', '/api/admin/reservations'], auth, async (req, res) => {
    const id = req.params.id || req.query.id;
    if (!id) return res.status(400).json({ error: 'Reservation ID is required' });

    const reservations = await getReservations();
    const index = reservations.findIndex(r => r.id === id);
    if (index === -1) return res.status(404).json({ error: 'Reservation not found' });
    
    const oldStatus = reservations[index].status;
    const newStatus = req.body.status || oldStatus;
    
    reservations[index].status = newStatus;
    await saveReservations(reservations);
    
    if (oldStatus !== newStatus) {
        await notifyTelegramCustomer(reservations[index], newStatus);
    }
    
    res.json({ success: true, reservation: reservations[index] });
});

app.delete(['/api/admin/reservations/:id', '/api/admin/reservations'], auth, async (req, res) => {
    const id = req.params.id || req.query.id;
    if (!id) return res.status(400).json({ error: 'Reservation ID is required' });

    let reservations = await getReservations();
    const initialLength = reservations.length;
    reservations = reservations.filter(r => r.id !== id);
    if (reservations.length === initialLength) return res.status(404).json({ error: 'Reservation not found' });
    
    await saveReservations(reservations);
    res.json({ success: true });
});

// Admin Users & Customers Endpoint
app.get('/api/admin/users', auth, async (req, res) => {
    const reservations = await getReservations();
    const adminUsers = await getCloudUsers();

    // Aggregate customer details from all reservations
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

    res.json({
        success: true,
        adminUsers: adminUsers,
        customerUsers: customerUsers
    });
});

app.post('/api/admin/users', auth, async (req, res) => {
    const { username, role, password } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const adminUsers = await getCloudUsers();
    const newUser = {
        id: crypto.randomUUID(),
        username,
        role: role || 'Admin',
        status: 'Active',
        createdAt: new Date().toISOString()
    };

    adminUsers.push(newUser);
    await saveCloudUsers(adminUsers);

    res.status(201).json({ success: true, user: newUser });
});

app.delete(['/api/admin/users/:id', '/api/admin/users'], auth, async (req, res) => {
    const id = req.params.id || req.query.id;
    let adminUsers = await getCloudUsers();
    adminUsers = adminUsers.filter(u => u.id !== id && u.username !== id);
    await saveCloudUsers(adminUsers);
    res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server running on http://0.0.0.0:${PORT}`);
    console.log(`Admin page available at http://localhost:${PORT}/admin.html`);
});
