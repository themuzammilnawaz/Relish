/**
 * Relish Pizza Bar — server
 * Wood-fired, handcrafted, served with soul.
 */
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import * as db from './db.js';
import { seedData } from './seed.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
db.init(() => structuredClone(seedData));

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── helpers
const makeOrderNumber = () =>
  'RPB-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();

// ─── brand / config
app.get('/api/config', (req, res) => {
  res.json({
    brand: {
      name: 'Relish Pizza Bar',
      tagline: 'Wood-fired · Handcrafted · Served with soul',
      phone: '0303 6422192',
      phoneRaw: '03036422192',
      whatsapp: config.whatsapp,
      email: 'hello@relishpizzabar.pk',
      location: 'Khanqah Sharif, Bahawalpur, Punjab'
    },
    currency: config.currency,
    taxRate: config.taxRate,
    deliveryFee: config.deliveryFee,
    freeDeliveryOver: config.freeDeliveryOver
  });
});

// ─── menu
app.get('/api/menu', (req, res) => {
  const showAll = req.query.all === '1';
  const rows = db.all('menu', showAll ? undefined : (m) => m.available !== false);
  rows.sort((a, b) => a.id - b.id);
  res.json(rows);
});

app.post('/api/menu', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'Name and price are required' });
  const row = db.insert('menu', {
    name: String(name).slice(0, 100),
    nameUr: String(req.body.nameUr || '').slice(0, 100),
    description: String(req.body.description || '').slice(0, 400),
    descriptionUr: String(req.body.descriptionUr || '').slice(0, 400),
    category: String(req.body.category || 'Signature Pizzas').slice(0, 60),
    categoryUr: String(req.body.categoryUr || '').slice(0, 60),
    price: Number(price),
    image: String(req.body.image || '🍽️').slice(0, 8),
    imageUrl: String(req.body.imageUrl || '').slice(0, 500),
    available: req.body.available !== false
  });
  res.status(201).json(row);
});

app.put('/api/menu/:id', (req, res) => {
  const patch = {};
  ['name', 'nameUr', 'description', 'descriptionUr', 'category', 'categoryUr', 'image', 'imageUrl'].forEach((k) => {
    if (req.body[k] !== undefined) patch[k] = req.body[k];
  });
  if (req.body.price !== undefined) patch.price = Number(req.body.price);
  if (req.body.available !== undefined) patch.available = !!req.body.available;
  const row = db.update('menu', req.params.id, patch);
  if (!row) return res.status(404).json({ error: 'Item not found' });
  res.json(row);
});

app.delete('/api/menu/:id', (req, res) => {
  const ok = db.remove('menu', req.params.id);
  if (!ok) return res.status(404).json({ error: 'Item not found' });
  res.json({ ok: true });
});

// ─── orders (cash on delivery only)
app.post('/api/orders', (req, res) => {
  const { items, customer } = req.body;
  if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'Cart is empty' });
  if (!customer?.name || !customer?.phone) return res.status(400).json({ error: 'Name and phone are required' });

  const menu = db.all('menu');
  const lines = [];
  for (const it of items) {
    const m = menu.find(x => Number(x.id) === Number(it.id));
    if (!m || m.available === false) return res.status(400).json({ error: `Item unavailable: ${it.name || it.id}` });
    const qty = Math.max(1, Math.min(50, Number(it.qty) || 1));
    lines.push({ id: m.id, name: m.name, nameUr: m.nameUr, price: m.price, qty });
  }

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const tax = Math.round(subtotal * config.taxRate);
  const deliveryFee = subtotal >= config.freeDeliveryOver ? 0 : config.deliveryFee;
  const total = subtotal + tax + deliveryFee;

  const order = db.insert('orders', {
    orderNumber: makeOrderNumber(),
    customer: {
      name: String(customer.name).slice(0, 80),
      phone: String(customer.phone).slice(0, 30),
      address: String(customer.address || '').slice(0, 300),
      notes: String(customer.notes || '').slice(0, 500)
    },
    items: lines,
    subtotal, tax, deliveryFee, total,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    status: 'new',
    language: req.body.language || 'en'
  });
  res.status(201).json(order);
});

// ─── reservations
app.post('/api/reservations', (req, res) => {
  const { name, phone, date, time } = req.body;
  if (!name || !phone || !date || !time) return res.status(400).json({ error: 'Name, phone, date and time are required' });
  const row = db.insert('reservations', {
    name: String(name).slice(0, 80),
    phone: String(phone).slice(0, 30),
    guests: Math.max(1, Math.min(30, Number(req.body.guests) || 2)),
    date: String(date).slice(0, 20),
    time: String(time).slice(0, 20),
    notes: String(req.body.notes || '').slice(0, 500),
    status: 'pending'
  });
  res.status(201).json(row);
});

// ─── reviews
app.get('/api/reviews', (req, res) => {
  const rows = db.all('reviews', r => r.approved !== false);
  rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(rows.slice(0, 20));
});

app.post('/api/reviews', (req, res) => {
  const { name, text } = req.body;
  if (!name || !text) return res.status(400).json({ error: 'Name and review text are required' });
  const row = db.insert('reviews', {
    name: String(name).slice(0, 60),
    rating: Math.max(1, Math.min(5, Number(req.body.rating) || 5)),
    text: String(text).slice(0, 1000),
    approved: false
  });
  res.status(201).json(row);
});

// ─── contact
app.post('/api/contact', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.status(400).json({ error: 'Name and message are required' });
  const row = db.insert('messages', {
    name: String(name).slice(0, 80),
    email: String(req.body.email || '').slice(0, 160),
    message: String(message).slice(0, 2000),
    read: false
  });
  res.status(201).json(row);
});

// ─── tables (public live status)
app.get('/api/tables', (req, res) => {
  const rows = db.all('tables');
  const total = rows.length;
  const free = rows.filter(t => t.status === 'free').length;
  const occupied = rows.filter(t => t.status === 'occupied').length;
  const reserved = rows.filter(t => t.status === 'reserved').length;
  res.json({ total, free, occupied, reserved });
});

// ─── admin
app.get('/api/admin/stats', (req, res) => {
  const orders = db.all('orders');
  const reservations = db.all('reservations');
  const messages = db.all('messages');
  const tables = db.all('tables');
  res.json({
    revenue: orders.filter(o => o.paymentStatus === 'paid').reduce((s, o) => s + Number(o.total || 0), 0),
    orders: orders.length,
    newOrders: orders.filter(o => o.status === 'new').length,
    pendingReservations: reservations.filter(r => r.status === 'pending').length,
    tablesFree: tables.filter(t => t.status === 'free').length,
    tablesTotal: tables.length,
    unreadMessages: messages.filter(m => !m.read).length
  });
});

app.get('/api/admin/orders', (req, res) => {
  res.json(db.all('orders').slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.put('/api/admin/orders/:id/status', (req, res) => {
  const allowed = ['new', 'confirmed', 'preparing', 'out_for_delivery', 'completed', 'cancelled'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ error: 'Invalid status' });
  const row = db.update('orders', req.params.id, { status: req.body.status });
  if (!row) return res.status(404).json({ error: 'Order not found' });
  res.json(row);
});

app.put('/api/admin/orders/:id/paid', (req, res) => {
  const row = db.update('orders', req.params.id, { paymentStatus: 'paid' });
  if (!row) return res.status(404).json({ error: 'Order not found' });
  res.json(row);
});

app.get('/api/admin/reservations', (req, res) => {
  res.json(db.all('reservations').slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.put('/api/admin/reservations/:id/status', (req, res) => {
  const allowed = ['pending', 'confirmed', 'seated', 'cancelled'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ error: 'Invalid status' });
  const row = db.update('reservations', req.params.id, { status: req.body.status });
  if (!row) return res.status(404).json({ error: 'Reservation not found' });
  res.json(row);
});

app.get('/api/admin/tables', (req, res) => {
  res.json(db.all('tables').slice().sort((a, b) => a.id - b.id));
});

app.put('/api/admin/tables/:id', (req, res) => {
  const allowed = ['free', 'occupied', 'reserved'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ error: 'Invalid status' });
  const row = db.update('tables', req.params.id, { status: req.body.status });
  if (!row) return res.status(404).json({ error: 'Table not found' });
  res.json(row);
});

app.put('/api/admin/tables', (req, res) => {
  const allowed = ['free', 'occupied', 'reserved'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ error: 'Invalid status' });
  const rows = db.all('tables');
  for (const t of rows) db.update('tables', t.id, { status: req.body.status });
  res.json({ ok: true, count: rows.length });
});

app.get('/api/admin/reviews', (req, res) => {
  res.json(db.all('reviews').slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.put('/api/admin/reviews/:id', (req, res) => {
  const row = db.update('reviews', req.params.id, { approved: !!req.body.approved });
  if (!row) return res.status(404).json({ error: 'Review not found' });
  res.json(row);
});

app.delete('/api/admin/reviews/:id', (req, res) => {
  const ok = db.remove('reviews', req.params.id);
  if (!ok) return res.status(404).json({ error: 'Review not found' });
  res.json({ ok: true });
});

app.get('/api/admin/messages', (req, res) => {
  res.json(db.all('messages').slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.put('/api/admin/messages/:id/read', (req, res) => {
  const row = db.update('messages', req.params.id, { read: true });
  if (!row) return res.status(404).json({ error: 'Message not found' });
  res.json(row);
});

// ─── pages
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// ─── 404 / errors
app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => {
  console.error('[error]', err);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong' });
});

app.listen(config.port, () => {
  console.log(`\n  ✦  Relish Pizza Bar`);
  console.log(`     http://localhost:${config.port}`);
  console.log(`     Admin: http://localhost:${config.port}/admin\n`);
});
