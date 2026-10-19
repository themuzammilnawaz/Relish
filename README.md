# ✦ Relish Pizza Bar

A warm, restaurant-first website for **Relish Pizza Bar — Khanqah Sharif, Bahawalpur**.
Wood-fired · Handcrafted · Served with soul.

## Features

- Warm restaurant-first design (ivory, terracotta, forest green, gold hairlines)
- Real food photography (Unsplash)
- Online ordering with cart & checkout — **Cash on Delivery only**
- Live table availability banner (auto-refreshes every 30s)
- Reservations, Reviews, Contact form
- Admin panel (open, no login) for orders, reservations, tables, menu, reviews, messages
- English / اردو toggle with full RTL support
- Zero-dependency JSON storage — no database needed

## Tech stack

Deliberately flat. No route folders, no middleware folder, no ORM.

```

server.js    ← all API routes
db.js        ← tiny JSON file store
config.js    ← env config
seed.js      ← demo menu, tables, reviews
public/      ← static frontend

```

## Run locally

```bash
cp .env.example .env      # optional
npm install
npm start
```

- Site:  [http://localhost:3000](http://localhost:3000/)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

First run creates `data/db.json` with the sample menu (26 dishes, 10 tables, 3 reviews).

To reset demo data: `rm data/db.json` and restart.

## Deploy to your Oracle VPS

```
# On the VPS:
git clone <your-repo> relish && cd relish
cp .env.example .env
docker compose up -d --build
```

The `docker-compose.yml` mounts `./data` as a volume, so your orders/reviews/menu edits survive restarts and rebuilds. Put Nginx or Caddy in front for TLS.

## A note on Vercel

Vercel runs Node in a serverless environment with a **read-only filesystem**. This project writes `data/db.json` on every order, review, or admin edit — those writes will fail on Vercel. Use your Oracle VPS (or Railway, Fly, etc.) instead — anywhere with persistent disk. The Docker setup is already prepared for that.

## Environment

| Variable ↕▾ | Default ↕▾ | Notes ↕▾ |
|---|---|---|
| −`PORT` | `3000` |  |
| `CURRENCY` | `PKR` |  |
| `TAX_RATE` | `0.05` | 5% |
| `DELIVERY_FEE` | `150` | Rs |
| `FREE_DELIVERY_OVER` | `3000` | Rs |
| `DATA_FILE` | `./data/db.json` |  |
| `WHATSAPP` | `923036422192` | Floating WhatsApp button |
⚙

## License

MIT.

