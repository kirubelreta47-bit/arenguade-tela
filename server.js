import express from 'express';
import fs from 'fs';
import crypto from 'crypto';
import 'dotenv/config';

// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
let dynamicChatId = process.env.TELEGRAM_CHAT_ID;

const notifyTelegram = async (message) => {
    if (!TELEGRAM_BOT_TOKEN) {
        console.log('Telegram bot token missing.');
        return;
    }

    if (!dynamicChatId) {
        try {
            const upRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
            const upData = await upRes.json();
            if (upData.ok && upData.result.length > 0) {
                const lastMessage = upData.result[upData.result.length - 1];
                dynamicChatId = lastMessage.message?.chat?.id || lastMessage.my_chat_member?.chat?.id;
                console.log('Auto-detected Telegram Chat ID:', dynamicChatId);
            }
        } catch(e) {
            console.error('Failed to get updates for auto-detect:', e);
        }
    }

    if (!dynamicChatId) {
        console.log('Telegram Chat ID not found. Send any message to the bot first! Pending notification:', message.replace(/\n/g, ' '));
        return;
    }

    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: dynamicChatId, text: message, parse_mode: 'HTML' })
        });
    } catch (err) {
        console.error('Failed to send Telegram message:', err);
    }
};

const app = express();
const PORT = 3001;
const DATA_FILE = './reservations.json';
const ADMIN_TOKEN = 'admin_secret_token_123';

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-api-key');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

const readData = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (e) {
        return [];
    }
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

app.post('/api/reservation', (req, res) => {
    const data = req.body;
    if (!data.name || !data.phone || !data.date) {
        return res.status(400).json({ error: 'Name, phone and date are required' });
    }
    const reservations = readData();
    const newReservation = {
        id: crypto.randomUUID(),
        unique_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    reservations.push(newReservation);
    writeData(reservations);
    
    notifyTelegram(`🗓 <b>New Reservation!</b>\n\n<b>Name:</b> ${newReservation.name}\n<b>Phone:</b> ${newReservation.phone}\n<b>Date:</b> ${newReservation.date} ${newReservation.time || ''}\n<b>Guests:</b> ${newReservation.guests || '1'}\n<b>Code:</b> <code>${newReservation.unique_code}</code>`);
    
    res.status(201).json({ success: true, reservation: newReservation });
});

app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, token: ADMIN_TOKEN });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

const auth = (req, res, next) => {
    if (req.headers['x-api-key'] === ADMIN_TOKEN) return next();
    res.status(403).json({ error: 'Forbidden' });
};

app.get('/api/admin/reservations', auth, (req, res) => {
    res.json({ data: readData() });
});

app.put('/api/admin/reservations/:id', auth, (req, res) => {
    const reservations = readData();
    const index = reservations.findIndex(r => r.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    
    const oldStatus = reservations[index].status;
    const newStatus = req.body.status || oldStatus;
    
    reservations[index].status = newStatus;
    writeData(reservations);
    
    if (oldStatus !== newStatus) {
        notifyTelegram(`🔄 <b>Reservation Update</b>\n\n${reservations[index].name}'s reservation is now: <b>${newStatus.toUpperCase()}</b>`);
    }
    
    res.json({ success: true, reservation: reservations[index] });
});

app.delete('/api/admin/reservations/:id', auth, (req, res) => {
    let reservations = readData();
    const initialLength = reservations.length;
    reservations = reservations.filter(r => r.id !== req.params.id);
    if (reservations.length === initialLength) return res.status(404).json({ error: 'Not found' });
    writeData(reservations);
    res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});
