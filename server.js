const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// --- 1. Database Helpers (MongoDB + Local JSON Fallback) ---
let isMongoConnected = false;

// Mongoose Schemas
const gardenSchema = new mongoose.Schema({
  id: String,
  name: String,
  owner: String,
  location: String,
  specialty: String,
  totalSales: Number,
  plantsCount: Number
});

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  gardenId: String,
  gardenName: String,
  gardenerName: String,
  category: String,
  price: Number,
  rating: Number,
  reviewsCount: Number,
  image: String,
  badge: String,
  light: String,
  water: String,
  pet: String,
  dimensions: String,
  levitationStability: String,
  description: String
});

const orderSchema = new mongoose.Schema({
  id: String,
  date: String,
  customer: String,
  customerPhone: String,
  gardenId: String,
  gardenName: String,
  gardenerName: String,
  productName: String,
  address: String,
  subtotal: Number,
  shippingFee: Number,
  discount: Number,
  total: Number,
  itemsCount: Number,
  paymentMethod: String,
  paymentDetails: String,
  paymentStatus: String,
  transactionRef: String,
  status: String
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  role: String,
  gardenId: String,
  gardenName: String,
  points: Number,
  status: String
});

const GardenModel = mongoose.model('Garden', gardenSchema);
const ProductModel = mongoose.model('Product', productSchema);
const OrderModel = mongoose.model('Order', orderSchema);
const UserModel = mongoose.model('User', userSchema);

// Helper for reading/writing local DB file
function readLocalDB() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { gardens: [], products: [], orders: [], users: [] };
  }
}

function writeLocalDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to local DB file:', err.message);
  }
}

// Connect MongoDB with short timeout so server starts instantly
mongoose.connect('mongodb://127.0.0.1:27017/plantkart', {
  serverSelectionTimeoutMS: 2000
}).then(() => {
  isMongoConnected = true;
  console.log('⚡ Connected to MongoDB (mongodb://127.0.0.1:27017/plantkart)');
}).catch(() => {
  isMongoConnected = false;
  console.log('📦 Local JSON Database Engine Active (database.json)');
});

// --- 2. REST API Routes ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: isMongoConnected ? 'MongoDB' : 'Local File DB (database.json)',
    timestamp: new Date().toISOString()
  });
});

// GET /api/gardens
app.get('/api/gardens', async (req, res) => {
  if (isMongoConnected) {
    try {
      const gardens = await GardenModel.find();
      return res.json(gardens);
    } catch (err) {}
  }
  const db = readLocalDB();
  res.json(db.gardens || []);
});

// POST /api/gardens (Admin Add Garden)
app.post('/api/gardens', async (req, res) => {
  const newGarden = req.body;
  if (!newGarden.id) newGarden.id = 'g-custom-' + Date.now();

  if (isMongoConnected) {
    try {
      const doc = await GardenModel.create(newGarden);
      return res.status(201).json(doc);
    } catch (err) {}
  }

  const db = readLocalDB();
  db.gardens = db.gardens || [];
  db.gardens.unshift(newGarden);
  writeLocalDB(db);
  res.status(201).json(newGarden);
});

// GET /api/products
app.get('/api/products', async (req, res) => {
  if (isMongoConnected) {
    try {
      const products = await ProductModel.find();
      return res.json(products);
    } catch (err) {}
  }
  const db = readLocalDB();
  res.json(db.products || []);
});

// POST /api/products (Admin Add Product)
app.post('/api/products', async (req, res) => {
  const newProduct = req.body;
  if (!newProduct.id) newProduct.id = 'pk-custom-' + Date.now();

  if (isMongoConnected) {
    try {
      const doc = await ProductModel.create(newProduct);
      return res.status(201).json(doc);
    } catch (err) {}
  }

  const db = readLocalDB();
  db.products.unshift(newProduct);
  writeLocalDB(db);
  res.status(201).json(newProduct);
});

// DELETE /api/products/:id (Admin Delete Product)
app.delete('/api/products/:id', async (req, res) => {
  const prodId = req.params.id;

  if (isMongoConnected) {
    try {
      await ProductModel.deleteOne({ id: prodId });
      return res.json({ message: 'Deleted successfully' });
    } catch (err) {}
  }

  const db = readLocalDB();
  db.products = db.products.filter(p => p.id !== prodId);
  writeLocalDB(db);
  res.json({ message: 'Deleted successfully from database' });
});

// GET /api/orders
app.get('/api/orders', async (req, res) => {
  if (isMongoConnected) {
    try {
      const orders = await OrderModel.find().sort({ _id: -1 });
      return res.json(orders);
    } catch (err) {}
  }

  const db = readLocalDB();
  res.json(db.orders || []);
});

// POST /api/orders (Create Order)
app.post('/api/orders', async (req, res) => {
  const newOrder = req.body;
  if (!newOrder.id) newOrder.id = '#PK-MAGLEV-' + Math.floor(1000 + Math.random() * 9000);
  if (!newOrder.date) newOrder.date = new Date().toISOString().split('T')[0];

  if (isMongoConnected) {
    try {
      const doc = await OrderModel.create(newOrder);
      return res.status(201).json(doc);
    } catch (err) {}
  }

  const db = readLocalDB();
  db.orders.unshift(newOrder);
  writeLocalDB(db);
  res.status(201).json(newOrder);
});

// PATCH /api/orders/:id/status
app.patch('/api/orders/:id/status', async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  if (isMongoConnected) {
    try {
      const updated = await OrderModel.findOneAndUpdate({ id: orderId }, { status }, { new: true });
      return res.json(updated);
    } catch (err) {}
  }

  const db = readLocalDB();
  const order = db.orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    writeLocalDB(db);
    return res.json(order);
  }
  res.status(404).json({ error: 'Order not found' });
});

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, role } = req.body;
  const newUser = { name, email, role: role || 'customer', points: 100, status: 'Active' };

  if (isMongoConnected) {
    try {
      const doc = await UserModel.create(newUser);
      return res.status(201).json(doc);
    } catch (err) {}
  }

  const db = readLocalDB();
  db.users.push(newUser);
  writeLocalDB(db);
  res.status(201).json(newUser);
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { username, email, password } = req.body;
  const inputUser = (username || email || '').toLowerCase();
  const inputPass = password || '';

  const db = readLocalDB();
  let foundUser = (db.users || []).find(u => 
    (u.username && u.username.toLowerCase() === inputUser) || 
    (u.email && u.email.toLowerCase() === inputUser)
  );

  if (foundUser) {
    if (foundUser.password && foundUser.password !== inputPass) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    return res.json({ message: 'Login successful', user: foundUser });
  }

  // Hardcoded Fallback for exact requested credentials
  if (inputUser === 'admin' && inputPass === 'admin') {
    const adminUser = { username: 'admin', name: 'System Admin', email: 'admin@plantkart.io', role: 'admin' };
    return res.json({ message: 'Login successful', user: adminUser });
  }
  if (inputUser === 'garden' && inputPass === 'garden') {
    const gardenerUser = { username: 'garden', name: 'Garden Master', email: 'garden@plantkart.io', role: 'gardener', gardenId: 'g-zen-01' };
    return res.json({ message: 'Login successful', user: gardenerUser });
  }

  // Create default customer session if unknown user
  const formattedName = inputUser.charAt(0).toUpperCase() + inputUser.slice(1);
  const newUser = { username: inputUser, name: formattedName, email: `${inputUser}@plantkart.io`, role: 'customer' };
  res.json({ message: 'Login successful', user: newUser });
});

// GET /api/users
app.get('/api/users', async (req, res) => {
  if (isMongoConnected) {
    try {
      const users = await UserModel.find();
      return res.json(users);
    } catch (err) {}
  }

  const db = readLocalDB();
  res.json(db.users || []);
});

// --- 3. Start Express Server ---
app.listen(PORT, () => {
  console.log(`
  =============================================================
  🌱 PLANTKART DATABASE & REST API SERVER ACTIVE
  =============================================================
  🔗 Server URL: http://localhost:${PORT}
  🔗 API Health: http://localhost:${PORT}/api/health
  🔗 Products:   http://localhost:${PORT}/api/products
  🔗 Orders:     http://localhost:${PORT}/api/orders
  =============================================================
  `);
});
