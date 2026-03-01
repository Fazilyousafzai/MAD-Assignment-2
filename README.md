# SmartDine — Backend Server

A Node.js + Express REST API backend for the SmartDine restaurant mobile app.

---

## How to Run

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Start the server

```bash
node app.js
```

You will see this in your terminal:
```
╔══════════════════════════════════════════════════╗
║       🍽️   SmartDine Server is RUNNING!           ║
╚══════════════════════════════════════════════════╝

  Open in browser → http://localhost:3001/catalog
  Daily Specials  → http://localhost:3001/catalog/specials
  Health check    → http://localhost:3001/
```

---

## Assignment 2 — Required Endpoints

### Q1 — Hardcoded Menu Catalog (open these in your browser)

| URL | What it shows |
|-----|--------------|
| `http://localhost:3001/catalog` | All 14 menu items with name, price, category, image |
| `http://localhost:3001/catalog/specials` | Only the 3 Daily Specials items |

### Q2 — Image URLs

Every item in the catalog has an `image` field with a direct URL from Unsplash.
No local files needed — the app loads images straight from the internet.

Example:
```json
{
  "name": "Filet Mignon",
  "category": "Mains",
  "price": "$68.00",
  "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400"
}
```

### Q3 — Order Logger (watch your terminal)

Send a POST request to `/order` from the React Native app by tapping "Place Order".

The terminal will print:
```
╔══════════════════════════════════════════════════╗
║          🍽️  NEW ORDER RECEIVED — SmartDine       ║
╚══════════════════════════════════════════════════╝
  🕐 Time     : 2:45:30 PM
  👤 Customer : Alex Rivera
  🪑 Type     : dine-in
  🛒 Items Ordered:
     1. Filet Mignon  x2  →  $136.00
     2. Truffle Arancini  x1  →  $18.00
  💰 Total    : $154.00
  💳 Payment  : card
──────────────────────────────────────────────────
```

This **proves the frontend and backend are communicating**.

---

## All Available Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/` | Server info + list of all endpoints |
| GET | `/catalog` | Full menu with images (Q1 + Q2) |
| GET | `/catalog/specials` | Daily Specials only (Q1) |
| GET | `/menu` | Menu for the app (supports `?category=` and `?search=`) |
| GET | `/menu/:id` | Single menu item by ID |
| POST | `/order` | **Order Logger** — prints to terminal (Q3) |
| POST | `/checkout` | Full checkout — also prints to terminal |
| POST | `/login` | Login with `{ email, password }` |
| POST | `/register` | Register with `{ name, email, password }` |
| POST | `/validate-coupon` | Validate a coupon code |

---

## Test Credentials

```
Email:    alex@example.com
Password: password123
```

## Test Coupons

| Code | Discount |
|------|----------|
| `CHEF20` | 20% off |
| `SAVE10` | 10% off |
| `BRUNCH24` | $15 off |

---

## Menu Categories

- **Daily Specials** — 3 items (today's featured dishes)
- **Starters** — 3 items
- **Mains** — 4 items
- **Desserts** — 3 items
- **Cocktails** — 2 items
- **Wine** — 2 items

---

## Project Structure

```
backend/
├── app.js          ← Single server file (all data + all routes)
├── server.js       ← Full server (splits data to mockData.js)
├── mockData.js     ← All seed data for the full server
├── package.json    ← Dependencies
└── README.md       ← This file
```

---

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Web framework for handling HTTP routes
- **cors** — Allows the mobile app to connect to this server
- **express.json()** — Parses incoming JSON request bodies automatically
