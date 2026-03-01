// =============================================================================
// app.js — SmartDine Backend Server
// Assignment 2: Hardcoded Menu Server + Image Catalog + Order Logger
//
// How to run:
//   node app.js
//
// Then open in your browser:
//   http://localhost:3001/catalog       ← See the full menu (Q1 + Q2)
//   http://localhost:3001/catalog/specials ← See only Daily Specials (Q1)
//
// When a user taps "Order" in the app, watch this terminal for the order log (Q3)
// =============================================================================

const express = require('express');
const cors    = require('cors');
const app     = express();
const PORT    = 3001;

app.use(cors());          // Allow the React Native app to talk to this server
app.use(express.json());  // Automatically parse incoming JSON request bodies

// =============================================================================
// MENU DATA — All food items hardcoded directly in this file
// Every item has: name, price, category, and an image URL (from Unsplash)
// =============================================================================
const menuItems = [

  // ── Daily Specials ────────────────────────────────────────────────────────
  {
    id: "s1",
    name: "Chef's Wagyu Burger",
    category: "Daily Specials",
    price: 28.00,
    description: "A5 Wagyu beef patty, brioche bun, aged cheddar, truffle aioli, caramelised onions.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    prepTime: "15 min",
    isAvailable: true
  },
  {
    id: "s2",
    name: "Saffron Seafood Paella",
    category: "Daily Specials",
    price: 42.00,
    description: "Traditional Spanish paella with prawns, mussels, squid, and chorizo. Serves one.",
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400",
    prepTime: "25 min",
    isAvailable: true
  },
  {
    id: "s3",
    name: "Mushroom & Goat Cheese Tart",
    category: "Daily Specials",
    price: 19.00,
    description: "Crispy puff pastry, wild mushrooms, creamy goat cheese, walnut pesto, micro herbs.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    prepTime: "18 min",
    isAvailable: true
  },

  // ── Starters ─────────────────────────────────────────────────────────────
  {
    id: "m1",
    name: "Truffle Arancini",
    category: "Starters",
    price: 18.00,
    description: "Golden crispy risotto balls filled with black truffle, fontina cheese, and wild mushrooms. Served with saffron aioli.",
    image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400",
    prepTime: "12 min",
    isAvailable: true
  },
  {
    id: "m2",
    name: "Wagyu Beef Carpaccio",
    category: "Starters",
    price: 32.00,
    description: "Paper-thin A5 Wagyu beef, aged parmesan shavings, capers, and a drizzle of white truffle oil.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400",
    prepTime: "10 min",
    isAvailable: true
  },
  {
    id: "m3",
    name: "Lobster Bisque",
    category: "Starters",
    price: 24.00,
    description: "Velvety Maine lobster bisque with cognac, crème fraîche, chives, and a half lobster tail garnish.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
    prepTime: "8 min",
    isAvailable: true
  },

  // ── Mains ────────────────────────────────────────────────────────────────
  {
    id: "m4",
    name: "Filet Mignon",
    category: "Mains",
    price: 68.00,
    description: "8oz center-cut tenderloin, herb butter, truffle pomme purée, haricots verts, red wine jus.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
    prepTime: "25 min",
    isAvailable: true
  },
  {
    id: "m5",
    name: "Pan-Seared Sea Bass",
    category: "Mains",
    price: 52.00,
    description: "Chilean sea bass with saffron beurre blanc, crispy capers, roasted cherry tomatoes, and herb oil.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
    prepTime: "20 min",
    isAvailable: true
  },
  {
    id: "m6",
    name: "Wild Mushroom Risotto",
    category: "Mains",
    price: 38.00,
    description: "Carnaroli rice with porcini, chanterelle, black trumpet mushrooms, aged parmesan, truffle oil.",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400",
    prepTime: "22 min",
    isAvailable: true
  },
  {
    id: "m7",
    name: "Rack of Lamb",
    category: "Mains",
    price: 74.00,
    description: "French-cut rack of lamb, pistachio herb crust, ratatouille, merguez-spiced jus, mint gremolata.",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400",
    prepTime: "30 min",
    isAvailable: true
  },

  // ── Desserts ─────────────────────────────────────────────────────────────
  {
    id: "m8",
    name: "Valrhona Chocolate Soufflé",
    category: "Desserts",
    price: 22.00,
    description: "Dark chocolate soufflé with warm vanilla crème anglaise, gold leaf, and Tahitian vanilla ice cream.",
    image: "https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=400",
    prepTime: "20 min",
    isAvailable: true
  },
  {
    id: "m9",
    name: "Crème Brûlée",
    category: "Desserts",
    price: 16.00,
    description: "Classic vanilla custard with a perfectly caramelised sugar crust. Served with seasonal berry compote.",
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400",
    prepTime: "10 min",
    isAvailable: true
  },
  {
    id: "m10",
    name: "Mango Panna Cotta",
    category: "Desserts",
    price: 14.00,
    description: "Silky Italian panna cotta layered with fresh Alphonso mango coulis and passion fruit.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    prepTime: "8 min",
    isAvailable: true
  },

  // ── Cocktails ────────────────────────────────────────────────────────────
  {
    id: "m11",
    name: "Gold Rush",
    category: "Cocktails",
    price: 18.00,
    description: "Bourbon, fresh lemon juice, honey syrup, edible gold dust. Shaken and served over a crystal ice sphere.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400",
    prepTime: "5 min",
    isAvailable: true
  },
  {
    id: "m12",
    name: "Yuzu Martini",
    category: "Cocktails",
    price: 20.00,
    description: "Premium vodka, fresh yuzu juice, elderflower liqueur, yuzu zest, and a salted rim.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400",
    prepTime: "5 min",
    isAvailable: true
  },

  // ── Wine ─────────────────────────────────────────────────────────────────
  {
    id: "m13",
    name: "Château Margaux 2015",
    category: "Wine",
    price: 380.00,
    description: "Premier Grand Cru Classé. Bordeaux blend of Cabernet Sauvignon and Merlot. Notes of blackcurrant and cedar.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
    prepTime: "2 min",
    isAvailable: true
  },
  {
    id: "m14",
    name: "Cloudy Bay Sauvignon Blanc",
    category: "Wine",
    price: 65.00,
    description: "Iconic New Zealand white wine. Fresh passionfruit, citrus, and stone fruit with a crisp, dry finish.",
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400",
    prepTime: "2 min",
    isAvailable: true
  }
];

// =============================================================================
// Q1 + Q2 — GET /catalog
// Opens directly in a browser and shows every item as nicely formatted JSON
// Each item has: name, price, category, image URL
// =============================================================================
app.get('/catalog', (req, res) => {
  // Build a clean summary (name, price, category, image) for each item
  const catalog = menuItems.map(item => ({
    id:       item.id,
    name:     item.name,
    category: item.category,
    price:    `$${item.price.toFixed(2)}`,
    image:    item.image,
    prepTime: item.prepTime
  }));

  res.json({
    restaurant: "SmartDine",
    totalItems: catalog.length,
    categories: [...new Set(menuItems.map(i => i.category))],
    menu: catalog
  });
});

// =============================================================================
// Q1 — GET /catalog/specials
// Returns ONLY the Daily Specials — your teacher can open this in a browser
// =============================================================================
app.get('/catalog/specials', (req, res) => {
  const specials = menuItems.filter(item => item.category === 'Daily Specials');

  res.json({
    category: "Daily Specials",
    count: specials.length,
    items: specials.map(item => ({
      name:     item.name,
      price:    `$${item.price.toFixed(2)}`,
      category: item.category,
      image:    item.image,
      description: item.description
    }))
  });
});

// =============================================================================
// Q3 — POST /order  ← THE ORDER LOGGER
// When the React Native app taps "Place Order", this endpoint receives the data
// and PRINTS it to the terminal — proving frontend and backend are connected
// =============================================================================
app.post('/order', (req, res) => {
  const order = req.body;

  // ── TERMINAL LOG (what your teacher wants to see) ─────────────────────────
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║          🍽️  NEW ORDER RECEIVED — SmartDine       ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`  🕐 Time     : ${new Date().toLocaleTimeString()}`);
  console.log(`  👤 Customer : ${order.customerName || 'Guest'}`);
  console.log(`  🪑 Type     : ${order.orderType || 'dine-in'}`);
  console.log('  🛒 Items Ordered:');

  if (order.items && order.items.length > 0) {
    order.items.forEach((item, index) => {
      console.log(`     ${index + 1}. ${item.name}  x${item.quantity}  →  $${(item.price * item.quantity).toFixed(2)}`);
    });
  } else {
    console.log('     (no items provided)');
  }

  console.log(`  💰 Total    : $${order.total || '0.00'}`);
  console.log(`  💳 Payment  : ${order.paymentMethod || 'card'}`);
  console.log('──────────────────────────────────────────────────\n');
  // ─────────────────────────────────────────────────────────────────────────

  // Send confirmation back to the app
  res.json({
    success: true,
    message: 'Order received! Check your terminal.',
    orderId: `ORD-${Date.now()}`,
    receivedAt: new Date().toISOString()
  });
});

// =============================================================================
// BONUS: The existing /checkout route from the full app also logs now
// This ensures the real app's cart flow ALSO shows in terminal
// =============================================================================
app.post('/checkout', (req, res) => {
  const { items, total, paymentMethod, type, tableNumber } = req.body;

  // ── TERMINAL LOG ──────────────────────────────────────────────────────────
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║        🛒  CHECKOUT ORDER — SmartDine App         ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`  🕐 Time     : ${new Date().toLocaleTimeString()}`);
  console.log(`  🪑 Order Type: ${type || 'dine-in'}${tableNumber ? ' | Table ' + tableNumber : ''}`);
  console.log('  🛒 Items:');
  if (items && items.length > 0) {
    items.forEach((item, i) => {
      console.log(`     ${i + 1}. ${item.name}  x${item.quantity}  →  $${(item.price * item.quantity).toFixed(2)}`);
    });
  }
  console.log(`  💰 Total    : $${total || '0.00'}`);
  console.log(`  💳 Payment  : ${paymentMethod || 'card'}`);
  console.log('──────────────────────────────────────────────────\n');
  // ─────────────────────────────────────────────────────────────────────────

  // Calculate totals
  const subtotal   = items ? items.reduce((s, i) => s + i.price * i.quantity, 0) : 0;
  const tax        = subtotal * 0.10;
  const orderTotal = subtotal + tax;

  res.json({
    success: true,
    message: 'Order placed successfully!',
    data: {
      id:          `ORD-${Date.now()}`,
      items,
      subtotal:    parseFloat(subtotal.toFixed(2)),
      tax:         parseFloat(tax.toFixed(2)),
      total:       parseFloat(orderTotal.toFixed(2)),
      status:      'confirmed',
      paymentMethod,
      createdAt:   new Date().toISOString()
    }
  });
});

// =============================================================================
// AUTH — kept minimal for the app to work
// =============================================================================
const users = [
  { id: "u1", name: "Alex Rivera", email: "alex@example.com", password: "password123",
    avatar: "https://i.pravatar.cc/150?img=11", loyaltyPoints: 2450, tier: "Gold" }
];

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const { password: _, ...safeUser } = user;
  res.json({ success: true, token: `token-${user.id}-${Date.now()}`, user: safeUser });
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: 'Name, email and password are required' });
  if (users.find(u => u.email === email))
    return res.status(409).json({ success: false, message: 'Email already registered' });
  const newUser = { id: `u${users.length + 1}`, name, email, password,
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50)}`,
    loyaltyPoints: 0, tier: 'Bronze' };
  users.push(newUser);
  const { password: _, ...safeUser } = newUser;
  res.json({ success: true, token: `token-${newUser.id}`, user: safeUser });
});

// =============================================================================
// MENU routes — for the full app compatibility
// =============================================================================
app.get('/menu', (req, res) => {
  const { category, search } = req.query;
  let result = [...menuItems];
  if (category && category !== 'All') result = result.filter(i => i.category === category);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
  }
  const categories = ['All', ...new Set(menuItems.map(i => i.category))];
  res.json({ success: true, data: result, categories, total: result.length });
});

app.get('/menu/:id', (req, res) => {
  const item = menuItems.find(m => m.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
  res.json({ success: true, data: item });
});

// Validate coupon
app.post('/validate-coupon', (req, res) => {
  const coupons = {
    'CHEF20':   { discount: 20, type: 'percent',  description: '20% off your order' },
    'SAVE10':   { discount: 10, type: 'percent',  description: '10% off your order' },
    'BRUNCH24': { discount: 15, type: 'fixed',    description: '$15 off brunch orders' }
  };
  const coupon = coupons[req.body.code];
  if (coupon) res.json({ success: true, coupon: { code: req.body.code, ...coupon } });
  else res.status(404).json({ success: false, message: 'Invalid coupon code' });
});

// Health check — quick way to verify the server is running
app.get('/', (req, res) => {
  res.json({
    status: '✅ SmartDine server is running!',
    tip: 'Open http://localhost:3001/catalog in your browser to see the menu',
    endpoints: {
      'GET  /catalog':          'Full menu catalog with images (open in browser)',
      'GET  /catalog/specials': 'Daily Specials only (open in browser)',
      'GET  /menu':             'Menu for the app (supports ?category=Mains&search=beef)',
      'POST /order':            'Place an order — check your terminal for the log',
      'POST /checkout':         'Full checkout — also logs to terminal',
      'POST /login':            'Login: { email, password }',
      'POST /register':         'Register: { name, email, password }'
    }
  });
});

// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║       🍽️   SmartDine Server is RUNNING!           ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`\n  Open in browser → http://localhost:${PORT}/catalog`);
  console.log(`  Daily Specials  → http://localhost:${PORT}/catalog/specials`);
  console.log(`  Health check    → http://localhost:${PORT}/`);
  console.log('\n  Waiting for orders... Place one from the app!\n');
});