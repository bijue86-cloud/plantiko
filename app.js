/* ==========================================================================
   PLANTKART — Anti-Gravity E-Commerce Core Application Logic
   ========================================================================== */

// --- 1. Product Catalog Data ---
const PRODUCTS = [
  {
    id: 'pk-monstera-01',
    name: 'Floating Monstera Deliciosa',
    category: 'indoor',
    price: 189.00,
    rating: 4.98,
    reviewsCount: 142,
    image: 'assets/monstera.png',
    badge: 'Zero-G MagLev',
    light: 'bright',
    water: 'auto',
    pet: 'any',
    dimensions: '35cm x 35cm x 45cm',
    levitationStability: '99.9% Quantum Lock',
    description: 'The iconic Swiss Cheese plant engineered with neodymium magnetic core. Features 360-degree floating rotation and automated micro-misting.'
  },
  {
    id: 'pk-succulent-02',
    name: 'Levitating Echeveria Prism',
    category: 'succulents',
    price: 89.00,
    rating: 4.92,
    reviewsCount: 88,
    image: 'assets/succulent.png',
    badge: 'Pet Safe',
    light: 'direct',
    water: 'monthly',
    pet: 'safe',
    dimensions: '18cm x 18cm x 22cm',
    levitationStability: '99.8% Lock',
    description: 'Rare pastel violet Echeveria suspended inside a geometric glass terrarium with glowing mint status ring. Ultra low maintenance.'
  },
  {
    id: 'pk-orchid-03',
    name: 'Ethereal Moonlit Orchid',
    category: 'flowering',
    price: 149.00,
    rating: 4.95,
    reviewsCount: 110,
    image: 'assets/orchid.png',
    badge: 'Zero-G MagLev',
    light: 'bright',
    water: 'weekly',
    pet: 'safe',
    dimensions: '25cm x 25cm x 40cm',
    levitationStability: '100% Lock',
    description: 'Luminescent white orchid species suspended over a brushed obsidian base with ambient glowing pollen aura misting.'
  },
  {
    id: 'pk-bonsai-04',
    name: 'Anti-Gravity Juniper Bonsai',
    category: 'outdoor',
    price: 229.00,
    rating: 4.99,
    reviewsCount: 204,
    image: 'assets/bonsai.png',
    badge: 'Masterpiece',
    light: 'bright',
    water: 'weekly',
    pet: 'safe',
    dimensions: '40cm x 40cm x 38cm',
    levitationStability: '99.9% Lock',
    description: '50-year sculpted Japanese Juniper floating smoothly above a Zen magnetic pedestal. Enhances mental clarity and room acoustics.'
  },
  {
    id: 'pk-smartpot-05',
    name: 'MagLev Smart Ceramic Base',
    category: 'pots',
    price: 119.00,
    rating: 4.88,
    reviewsCount: 76,
    image: 'assets/smart_pot.png',
    badge: 'Smart Hydration',
    light: 'low',
    water: 'auto',
    pet: 'safe',
    dimensions: '22cm x 22cm x 12cm',
    levitationStability: '100% Lock',
    description: 'Universal magnetic floating base with digital moisture display screen, wireless induction charging, and customizable RGB glow strip.'
  },
  {
    id: 'pk-calathea-06',
    name: 'Zero-G Peacock Calathea',
    category: 'indoor',
    price: 135.00,
    rating: 4.90,
    reviewsCount: 64,
    image: 'assets/monstera.png',
    badge: 'Pet Safe',
    light: 'low',
    water: 'weekly',
    pet: 'safe',
    dimensions: '28cm x 28cm x 35cm',
    levitationStability: '99.7% Lock',
    description: 'Striking patterned leaves that fold gently at dusk. Includes built-in bio-sensory light meter and gentle floating rotation.'
  },
  {
    id: 'pk-pothos-07',
    name: 'Levitating Neon Pothos',
    category: 'indoor',
    price: 79.00,
    rating: 4.86,
    reviewsCount: 95,
    image: 'assets/succulent.png',
    badge: 'Easy Care',
    light: 'low',
    water: 'weekly',
    pet: 'any',
    dimensions: '20cm x 20cm x 25cm',
    levitationStability: '99.8% Lock',
    description: 'Vibrant chartreuse trailing vines floating gracefully. Extremely resilient species thriving under artificial office lighting.'
  },
  {
    id: 'pk-mist-08',
    name: 'Bio-Nutritional Ionic Mist (500ml)',
    category: 'accessories',
    price: 29.00,
    rating: 4.94,
    reviewsCount: 310,
    image: 'assets/smart_pot.png',
    badge: 'Bio-Formula',
    light: 'low',
    water: 'auto',
    pet: 'safe',
    dimensions: '8cm x 8cm x 20cm',
    levitationStability: 'N/A',
    description: 'Enriched mist infused with trace ocean minerals, nitrogen, and foliage shine boosters for levitating plant health.'
  }
];

// --- 2. Application State ---
let state = {
  cart: JSON.parse(localStorage.getItem('plantkart_cart') || '[]'),
  wishlist: new Set(JSON.parse(localStorage.getItem('plantkart_wishlist') || '[]')),
  orders: JSON.parse(localStorage.getItem('plantkart_orders') || '[]'),
  user: JSON.parse(localStorage.getItem('plantkart_user') || 'null'),
  gardens: JSON.parse(localStorage.getItem('plantkart_gardens') || JSON.stringify([
    { id: 'g-zen-01', name: 'Zero-G Zen Garden', owner: 'Master Kenji', location: 'Kyoto Bio-Dome', specialty: 'Bonsai & Floating Moss Spheres', totalSales: 647.00, plantsCount: 3 },
    { id: 'g-canopy-02', name: 'Bio-Sphere Canopy Nursery', owner: 'Elena Rostova', location: 'Alpine Bio-Grid', specialty: 'Monsteras & Tropical Foliage', totalSales: 513.00, plantsCount: 3 },
    { id: 'g-aura-03', name: 'Aura Hydro-Gardens', owner: 'Alex Rivera', location: 'Pacific Bio-Haven', specialty: 'Ethereal Orchids & Succulents', totalSales: 288.00, plantsCount: 2 }
  ])),
  usersList: JSON.parse(localStorage.getItem('plantkart_users_list') || JSON.stringify([
    { name: 'Alex Rivera', email: 'alex@plantkart.io', role: 'customer', gardenId: '', points: 1450, status: 'Active Customer' },
    { name: 'Master Kenji', email: 'kenji@zen-garden.io', role: 'gardener', gardenId: 'g-zen-01', points: 3200, status: 'Master Gardener' },
    { name: 'Elena Rostova', email: 'elena@canopy-nursery.io', role: 'gardener', gardenId: 'g-canopy-02', points: 2800, status: 'Senior Gardener' },
    { name: 'Super Admin', email: 'admin@plantkart.io', role: 'admin', gardenId: '', points: 9999, status: 'Superadmin Active' }
  ])),
  category: 'all',
  sortBy: 'featured',
  searchQuery: '',
  appliedPromo: null,
  paymentMethod: 'upi'
};

// Default sample orders if none exist
if (state.orders.length === 0) {
  state.orders = [
    { id: '#PK-MAGLEV-9842', date: '2026-07-22', customer: 'Alex Rivera', gardenId: 'g-canopy-02', gardenName: 'Bio-Sphere Canopy Nursery', gardenerName: 'Elena Rostova', productName: 'Floating Monstera Deliciosa', address: '42 Zero-G Boulevard, Apt 8B, Bangalore (KA - 560001)', total: 189.00, itemsCount: 1, paymentMethod: 'UPI', status: 'Pending Gardener Acceptance' },
    { id: '#PK-MAGLEV-7731', date: '2026-07-21', customer: 'Elena Rostova', gardenId: 'g-zen-01', gardenName: 'Zero-G Zen Garden', gardenerName: 'Master Kenji', productName: 'Anti-Gravity Juniper Bonsai', address: '15 Neo Skyline Ave, Suite 4, London (UK - EC1A 1BB)', total: 229.00, itemsCount: 2, paymentMethod: 'CREDIT CARD', status: 'Accepted by Gardener - Levitating in Transit' }
  ];
  localStorage.setItem('plantkart_orders', JSON.stringify(state.orders));
}

// --- 3. DOM Elements ---
const productGrid = document.getElementById('product-grid');
const resultsCount = document.getElementById('results-count');
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const searchSuggestions = document.getElementById('search-suggestions');
const sortSelect = document.getElementById('sort-select');
const categoryPills = document.getElementById('category-pills');

const cartBtn = document.getElementById('cart-btn');
const cartCountBadge = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const cartClose = document.getElementById('cart-close');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartShipping = document.getElementById('cart-shipping');
const cartDiscount = document.getElementById('cart-discount');
const cartTotal = document.getElementById('cart-total');
const discountRow = document.getElementById('discount-row');
const meterProgress = document.getElementById('meter-progress');
const meterText = document.getElementById('meter-text');
const drawerCartCount = document.getElementById('drawer-cart-count');

const wishlistBtn = document.getElementById('wishlist-btn');
const wishlistCountBadge = document.getElementById('wishlist-count');
const wishlistModal = document.getElementById('wishlist-modal');
const wishlistClose = document.getElementById('wishlist-close');
const wishlistItemsContainer = document.getElementById('wishlist-items');

const profileBtn = document.getElementById('profile-btn');
const profileModal = document.getElementById('profile-modal');
const profileClose = document.getElementById('profile-close');

const loginNavBtn = document.getElementById('login-nav-btn');
const logoutNavBtn = document.getElementById('logout-nav-btn');
const userNavLabel = document.getElementById('user-nav-label');
const navGardenerLink = document.getElementById('nav-gardener-link');
const navAdminLink = document.getElementById('nav-admin-link');

const entryGateModal = document.getElementById('entry-gate-modal');
const loginModal = document.getElementById('login-modal');
const loginClose = document.getElementById('login-close');

const gardenerModal = document.getElementById('gardener-modal');
const gardenerClose = document.getElementById('gardener-close');

const adminModal = document.getElementById('admin-modal');
const adminClose = document.getElementById('admin-close');

const quickviewModal = document.getElementById('quickview-modal');
const quickviewClose = document.getElementById('quickview-close');
const quickviewContent = document.getElementById('quickview-content');

const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutClose = document.getElementById('checkout-close');
const checkoutFinishBtn = document.getElementById('checkout-finish-btn');

const demoVideoBtn = document.getElementById('demo-video-btn');
const videoModal = document.getElementById('video-modal');
const videoClose = document.getElementById('video-close');

const toastContainer = document.getElementById('toast-container');
const quizRecommendedCard = document.getElementById('quiz-recommended-card');
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:8080/api' : '/api';

// --- 4. Initialization & API Synchronization ---
document.addEventListener('DOMContentLoaded', () => {
  initParticlesCanvas();
  syncDatabaseWithAPI();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  updateUserNavUI();
  initParallaxEffect();
  initQuizLogic();
  setupEventListeners();
  checkEntryGateLock();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

function checkEntryGateLock() {
  if (!state.user) {
    entryGateModal.classList.remove('hidden');
  } else {
    entryGateModal.classList.add('hidden');
  }
}

async function syncDatabaseWithAPI() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        PRODUCTS.length = 0;
        PRODUCTS.push(...data);
        renderProducts();
      }
    }
  } catch (e) {
    console.log('Backend API offline. Operating in local DB mode.');
  }

  try {
    const resOrd = await fetch(`${API_BASE}/orders`);
    if (resOrd.ok) {
      const ordersData = await resOrd.json();
      if (ordersData && ordersData.length > 0) {
        state.orders = ordersData;
      }
    }
  } catch (e) {}

  try {
    const resUsers = await fetch(`${API_BASE}/users`);
    if (resUsers.ok) {
      const usersData = await resUsers.json();
      if (usersData && usersData.length > 0) {
        state.usersList = usersData;
      }
    }
  } catch (e) {}
}

// --- 5. Background Canvas Particle & Floating Leaf System ---
function initParticlesCanvas() {
  const canvas = document.getElementById('bg-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const numParticles = 40;
  const leaves = [];
  const numLeaves = 15;

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.6 + 0.2,
      opacity: Math.random() * 0.6 + 0.2
    });
  }

  for (let j = 0; j < numLeaves; j++) {
    leaves.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 8,
      speedY: Math.random() * 0.8 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.35 + 0.15
    });
  }

  function drawLeaf(x, y, size, rotation, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.8, size * 0.5, 0, size);
    ctx.bezierCurveTo(-size * 0.8, size * 0.5, -size * 0.8, -size * 0.5, 0, -size);
    ctx.fillStyle = `rgba(0, 245, 155, ${opacity})`;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Glowing particles
    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.3;
      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 245, 155, ${p.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f59b';
      ctx.fill();
    });

    // Floating Green Leaves
    leaves.forEach(l => {
      l.y -= l.speedY;
      l.x += Math.sin(l.y * 0.008) * 0.6;
      l.rotation += l.rotSpeed;

      if (l.y < -20) {
        l.y = height + 20;
        l.x = Math.random() * width;
      }

      drawLeaf(l.x, l.y, l.size, l.rotation, l.opacity);
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// --- 6. Render Product Grid ---
function renderProducts() {
  let filtered = PRODUCTS.filter(p => {
    const matchCat = state.category === 'all' || p.category === state.category;
    const matchSearch = p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                        p.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  resultsCount.textContent = `Showing ${filtered.length} zero-gravity products`;

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 0;">
        <i data-lucide="search-x" style="width: 48px; height: 48px; color: var(--primary-emerald); margin-bottom: 16px;"></i>
        <h3>No Levitating Botanicals Found</h3>
        <p style="color: var(--text-muted);">Try adjusting your search filters or browse other categories.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  productGrid.innerHTML = filtered.map(p => {
    const isWish = state.wishlist.has(p.id);
    return `
      <div class="product-card" data-id="${p.id}">
        <div class="card-badge-group">
          <span class="tag-badge maglev">${p.badge}</span>
          ${p.pet === 'safe' ? '<span class="tag-badge petsafe">Pet Safe</span>' : ''}
        </div>

        <button class="wishlist-toggle ${isWish ? 'active' : ''}" data-id="${p.id}" title="Save to wishlist">
          <i data-lucide="heart" ${isWish ? 'fill="currentColor"' : ''}></i>
        </button>

        <div class="product-img-box" onclick="openQuickView('${p.id}')">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          <div class="card-shadow-ellipse"></div>
        </div>

        <div class="product-info">
          <span class="product-category">${p.category}</span>
          <h3 class="product-title" onclick="openQuickView('${p.id}')" style="cursor:pointer;">${p.name}</h3>
          
          <div class="product-rating">
            <span class="stars-text">★★★★★</span>
            <span>${p.rating} (${p.reviewsCount})</span>
          </div>

          <div class="product-footer">
            <span class="price-tag">$${p.price.toFixed(2)}</span>
            <button class="add-cart-btn" onclick="addToCart('${p.id}')">
              <i data-lucide="plus"></i>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

// --- 7. Cart Operations ---
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`Added <strong>${product.name}</strong> to your Zero-G Cart`);

  cartBtn.style.transform = 'scale(1.25)';
  setTimeout(() => { cartBtn.style.transform = 'none'; }, 200);
}

function updateCartQuantity(productId, delta) {
  const item = state.cart.find(i => i.product.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.product.id !== productId);
  }

  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('plantkart_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadge.textContent = totalItems;
  drawerCartCount.textContent = `${totalItems} items`;

  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
        <i data-lucide="shopping-bag" style="width: 48px; height: 48px; opacity: 0.5; margin-bottom: 12px;"></i>
        <p>Your Zero-G cart is currently empty.</p>
      </div>
    `;
  } else {
    cartItemsContainer.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <img src="${item.product.image}" alt="${item.product.name}" />
        <div class="cart-item-details">
          <div class="cart-item-title">${item.product.name}</div>
          <div class="cart-item-price">$${item.product.price.toFixed(2)}</div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateCartQuantity('${item.product.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQuantity('${item.product.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-remove-btn" onclick="updateCartQuantity('${item.product.id}', -${item.quantity})" title="Remove item">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `).join('');
  }

  const subtotal = state.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const isFreeShipping = subtotal >= 99 || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 15.00;
  let discount = 0;

  if (state.appliedPromo === 'ANTIGRAVITY10') {
    discount = subtotal * 0.10;
    discountRow.classList.remove('hidden');
  } else {
    discountRow.classList.add('hidden');
  }

  const total = Math.max(0, subtotal - discount + shippingFee);

  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  cartShipping.textContent = isFreeShipping ? 'FREE' : `$${shippingFee.toFixed(2)}`;
  cartDiscount.textContent = `-$${discount.toFixed(2)}`;
  cartTotal.textContent = `$${total.toFixed(2)}`;

  const neededForFree = Math.max(0, 99 - subtotal);
  if (isFreeShipping || subtotal === 0) {
    meterText.textContent = subtotal === 0 ? 'Add $99 for Free Zero-G Delivery' : '🎉 You qualify for FREE Zero-G Delivery!';
    meterProgress.style.width = subtotal === 0 ? '0%' : '100%';
  } else {
    meterText.textContent = `Add $${neededForFree.toFixed(2)} more for Free Zero-G Shipping`;
    meterProgress.style.width = `${Math.min(100, (subtotal / 99) * 100)}%`;
  }

  if (window.lucide) window.lucide.createIcons();
}

// --- 8. Wishlist Operations ---
function toggleWishlist(productId) {
  if (state.wishlist.has(productId)) {
    state.wishlist.delete(productId);
    showToast('Removed from wishlist');
  } else {
    state.wishlist.add(productId);
    showToast('Saved to your Wishlist ❤️');
  }

  localStorage.setItem('plantkart_wishlist', JSON.stringify(Array.from(state.wishlist)));
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  wishlistCountBadge.textContent = state.wishlist.size;
  const wishListArray = Array.from(state.wishlist).map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  if (wishListArray.length === 0) {
    wishlistItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
        <i data-lucide="heart" style="width: 48px; height: 48px; opacity: 0.5; margin-bottom: 12px;"></i>
        <p>No saved plants in your wishlist yet.</p>
      </div>
    `;
  } else {
    wishlistItemsContainer.innerHTML = wishListArray.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <button class="add-cart-btn" onclick="addToCart('${item.id}'); toggleWishlist('${item.id}');">
          <i data-lucide="plus"></i> Add
        </button>
      </div>
    `).join('');
  }

  if (window.lucide) window.lucide.createIcons();
}

// --- 9. Checkout & Multi-Payment Module ---
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty! Add plants to proceed.');
    return;
  }

  cartDrawer.classList.add('hidden');
  document.getElementById('checkout-form-view').classList.remove('hidden');
  document.getElementById('checkout-success-view').classList.add('hidden');
  checkoutModal.classList.remove('hidden');

  // Pre-fill user if logged in
  if (state.user) {
    document.getElementById('co-name').value = state.user.name || '';
    document.getElementById('co-phone').value = state.user.phone || '';
    document.getElementById('co-address').value = state.user.address || '';
  }

  // Populate mini items list & summary calculations
  const itemsContainer = document.getElementById('checkout-items-list');
  itemsContainer.innerHTML = state.cart.map(item => `
    <div class="co-mini-item">
      <img src="${item.product.image}" alt="${item.product.name}" />
      <div class="co-mini-info">
        <strong>${item.product.name}</strong>
        <div>Qty: ${item.quantity}</div>
      </div>
      <div class="co-mini-price">$${(item.product.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');

  const subtotal = state.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const isFreeShipping = subtotal >= 99;
  const shippingFee = isFreeShipping ? 0 : 15.00;
  let discount = 0;

  if (state.appliedPromo === 'ANTIGRAVITY10') {
    discount = subtotal * 0.10;
    document.getElementById('co-discount-row').classList.remove('hidden');
  } else {
    document.getElementById('co-discount-row').classList.add('hidden');
  }

  const total = Math.max(0, subtotal - discount + shippingFee);

  document.getElementById('co-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('co-shipping').textContent = isFreeShipping ? 'FREE' : `$${shippingFee.toFixed(2)}`;
  document.getElementById('co-discount').textContent = `-$${discount.toFixed(2)}`;
  document.getElementById('co-total').textContent = `$${total.toFixed(2)}`;

  if (window.lucide) window.lucide.createIcons();
}

async function submitOrder() {
  const name = document.getElementById('co-name').value;
  const phone = document.getElementById('co-phone').value;
  const address = document.getElementById('co-address').value;
  const city = document.getElementById('co-city').value;
  const zip = document.getElementById('co-zip').value;

  const upiId = document.getElementById('co-upi-id')?.value || 'alex@okaxis';
  const cardNum = document.getElementById('co-card-num')?.value || '4532 •••• •••• 8912';

  const subtotal = state.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const isFreeShipping = subtotal >= 99;
  const shippingFee = isFreeShipping ? 0 : 15.00;
  let discount = state.appliedPromo === 'ANTIGRAVITY10' ? subtotal * 0.10 : 0;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const orderRef = '#PK-MAGLEV-' + Math.floor(1000 + Math.random() * 9000);
  const txnRef = 'TXN-' + state.paymentMethod.toUpperCase() + '-' + Math.floor(10000000 + Math.random() * 90000000);

  let payDetails = 'Instant Zero-G Payment';
  if (state.paymentMethod === 'upi') {
    payDetails = `VPA: ${upiId} | Instant UPI Verification`;
  } else if (state.paymentMethod === 'card') {
    payDetails = `Card: ${cardNum.slice(-4) ? '•••• ' + cardNum.slice(-4) : '•••• 8912'} | Visa/Mastercard`;
  } else if (state.paymentMethod === 'cod') {
    payDetails = 'Cash / UPI Scan on Delivery';
  }

  const payStatus = state.paymentMethod === 'cod' ? 'PENDING COD COLLECTION' : 'PAID & VERIFIED';

  const firstCartItem = state.cart[0]?.product;

  const newOrder = {
    id: orderRef,
    date: new Date().toISOString().split('T')[0],
    customer: name,
    customerPhone: phone,
    gardenId: firstCartItem?.gardenId || 'g-canopy-02',
    gardenName: firstCartItem?.gardenName || 'Bio-Sphere Canopy Nursery',
    gardenerName: firstCartItem?.gardenerName || 'Elena Rostova',
    productName: state.cart.map(i => `${i.product.name} (x${i.quantity})`).join(', '),
    address: `${address}, ${city} (${zip})`,
    subtotal: subtotal,
    shippingFee: shippingFee,
    discount: discount,
    total: total,
    itemsCount: state.cart.reduce((s, i) => s + i.quantity, 0),
    paymentMethod: state.paymentMethod.toUpperCase(),
    paymentDetails: payDetails,
    paymentStatus: payStatus,
    transactionRef: txnRef,
    status: 'Pending Gardener Acceptance'
  };

  state.orders.unshift(newOrder);
  localStorage.setItem('plantkart_orders', JSON.stringify(state.orders));

  // Sync to API Backend Database
  try {
    await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    });
  } catch (e) {}

  // Render Confirmation View
  document.getElementById('succ-order-ref').textContent = orderRef;
  document.getElementById('succ-order-details').innerHTML = `
    <div style="font-size: 0.9rem; line-height: 1.6;">
      <p><strong>Customer:</strong> ${name} (${phone})</p>
      <p><strong>Delivery Address:</strong> ${address}, ${city} - ${zip}</p>
      <p><strong>Payment Gateway:</strong> ${state.paymentMethod.toUpperCase()} (<span style="color: var(--primary-emerald);">${payStatus}</span>)</p>
      <p><strong>Payment Info:</strong> ${payDetails}</p>
      <p><strong>Transaction Ref:</strong> <code>${txnRef}</code></p>
      <p style="margin-top: 8px; font-size: 1.05rem; color: var(--primary-emerald);"><strong>Total Paid:</strong> $${total.toFixed(2)}</p>
    </div>
  `;

  // Reset cart
  state.cart = [];
  saveCart();
  updateCartUI();

  // Switch to success view
  document.getElementById('checkout-form-view').classList.add('hidden');
  document.getElementById('checkout-success-view').classList.remove('hidden');
}

// --- 10. Auth System (Login & Entry Gate) ---
function updateUserNavUI() {
  if (state.user) {
    userNavLabel.textContent = `${state.user.name.split(' ')[0]} (${state.user.role.toUpperCase()})`;
    logoutNavBtn.classList.remove('hidden');

    if (state.user.role === 'admin') {
      navAdminLink.classList.remove('hidden');
      navGardenerLink.classList.add('hidden');
    } else if (state.user.role === 'gardener') {
      navGardenerLink.classList.remove('hidden');
      navAdminLink.classList.add('hidden');
    } else {
      navAdminLink.classList.add('hidden');
      navGardenerLink.classList.add('hidden');
    }
  } else {
    userNavLabel.textContent = 'Login';
    navAdminLink.classList.add('hidden');
    navGardenerLink.classList.add('hidden');
    logoutNavBtn.classList.add('hidden');
  }
}

function selectGateRole(role) {
  if (role === 'admin') {
    quickGateLogin('admin');
  } else if (role === 'gardener') {
    quickGateLogin('gardener');
  } else {
    quickGateLogin('customer');
  }
}

function quickGateLogin(role) {
  fillDemoLogin(role);
  handleLoginSubmit();
  entryGateModal.classList.add('hidden');
}

function logoutUser() {
  state.user = null;
  localStorage.removeItem('plantkart_user');
  updateUserNavUI();
  showToast('Logged out successfully');
  entryGateModal.classList.remove('hidden');
}

async function handleLoginSubmit() {
  const emailInput = document.getElementById('login-email').value || 'admin';
  const passInput = document.getElementById('login-password').value || 'admin';
  const roleSelect = document.getElementById('login-role').value || 'customer';

  let role = roleSelect;
  let name = emailInput.split('@')[0];
  let gardenId = '';

  // Validate exact requested credentials
  if (emailInput.toLowerCase() === 'admin' && passInput === 'admin') {
    role = 'admin';
    name = 'System Admin';
  } else if (emailInput.toLowerCase() === 'garden' && passInput === 'garden') {
    role = 'gardener';
    name = 'Garden Master';
    gardenId = 'g-zen-01';
  } else if (emailInput.toLowerCase() === 'alex' && passInput === 'user') {
    role = 'customer';
    name = 'Alex Rivera';
  }

  state.user = { 
    username: emailInput,
    name: name.charAt(0).toUpperCase() + name.slice(1), 
    email: emailInput.includes('@') ? emailInput : `${emailInput}@plantkart.io`, 
    role,
    gardenId: role === 'gardener' ? 'g-zen-01' : ''
  };
  localStorage.setItem('plantkart_user', JSON.stringify(state.user));

  try {
    await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: emailInput, password: passInput, role })
    });
  } catch (e) {}

  showToast(`Welcome back, <strong>${state.user.name}</strong> (${role.toUpperCase()})`);
  updateUserNavUI();
  loginModal.classList.add('hidden');
  entryGateModal.classList.add('hidden');

  if (role === 'admin') {
    openAdminDashboard();
  } else if (role === 'gardener') {
    openGardenerPortal();
  }
}

async function handleRegisterSubmit() {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const role = document.getElementById('reg-role').value || 'customer';
  const password = document.getElementById('reg-password').value || 'pass';

  state.user = { username: name.toLowerCase(), name, email, role, gardenId: role === 'gardener' ? 'g-zen-01' : '' };
  localStorage.setItem('plantkart_user', JSON.stringify(state.user));

  try {
    await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: name.toLowerCase(), password, name, email, role })
    });
  } catch (e) {}

  showToast(`Account created! Welcome <strong>${name}</strong> (${role.toUpperCase()})`);
  updateUserNavUI();
  loginModal.classList.add('hidden');
  entryGateModal.classList.add('hidden');

  if (role === 'gardener') {
    openGardenerPortal();
  }
}

function fillDemoLogin(role) {
  if (role === 'admin') {
    document.getElementById('login-email').value = 'admin';
    document.getElementById('login-password').value = 'admin';
    document.getElementById('login-role').value = 'admin';
  } else if (role === 'gardener') {
    document.getElementById('login-email').value = 'garden';
    document.getElementById('login-password').value = 'garden';
    document.getElementById('login-role').value = 'gardener';
  } else {
    document.getElementById('login-email').value = 'alex';
    document.getElementById('login-password').value = 'user';
    document.getElementById('login-role').value = 'customer';
  }
}

// --- 11. Gardener Portal Engine ---
function openGardenerPortal() {
  renderGardenerPortal();
  gardenerModal.classList.remove('hidden');
}

function renderGardenerPortal() {
  const user = state.user || { name: 'Master Kenji', gardenId: 'g-zen-01' };
  const userGarden = state.gardens.find(g => g.id === user.gardenId || g.owner === user.name) || state.gardens[0];

  document.getElementById('gard-stat-garden').textContent = userGarden.name;

  const gardenerPlants = PRODUCTS.filter(p => p.gardenId === userGarden.id || p.gardenerName === user.name);
  document.getElementById('gard-stat-plants').textContent = gardenerPlants.length;

  const pendingOrders = state.orders.filter(o => o.status.includes('Pending') || o.gardenId === userGarden.id);
  document.getElementById('gard-stat-pending').textContent = pendingOrders.length;

  const totalEarnings = gardenerPlants.reduce((sum, p) => sum + (p.price * 4), 0);
  document.getElementById('gard-stat-earnings').textContent = `$${totalEarnings.toFixed(2)}`;

  // Populate Add Plant garden select dropdown
  const gardenSelect = document.getElementById('g-p-garden');
  gardenSelect.innerHTML = state.gardens.map(g => `
    <option value="${g.id}">${g.name} (${g.owner})</option>
  `).join('');

  // Render Gardener Orders List with Accept Buttons
  const ordersListContainer = document.getElementById('gardener-orders-list');
  ordersListContainer.innerHTML = state.orders.map(o => `
    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 16px; border-radius: var(--radius-md); margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <strong style="color: var(--primary-emerald);">${o.id}</strong> — ${o.customer}
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Item: <strong>${o.productName || 'Levitating Plant Parcel'}</strong> | Total: $${o.total.toFixed(2)} | Date: ${o.date}</div>
        <div style="font-size: 0.8rem; color: var(--text-dim); margin-top: 2px;">Delivery Address: ${o.address || 'Standard Zero-G Address'}</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
        <span class="status-tag ${o.status.includes('Accepted') || o.status.includes('Transit') ? 'delivered' : 'transit'}">${o.status}</span>
        ${o.status.includes('Pending') ? `
          <button class="btn-success-xs" onclick="acceptGardenerOrder('${o.id}')"><i data-lucide="check"></i> Accept Order & Dispatch</button>
        ` : `
          <span style="font-size: 0.78rem; color: #34d399;">✓ Order Accepted</span>
        `}
      </div>
    </div>
  `).join('');

  // Render Gardener Inventory Table
  const inventoryBody = document.getElementById('gardener-inventory-table-body');
  inventoryBody.innerHTML = gardenerPlants.map(p => `
    <tr>
      <td>
        <img src="${p.image}" class="adm-thumb" alt="${p.name}" />
        <strong>${p.name}</strong>
      </td>
      <td>${p.gardenName || userGarden.name}</td>
      <td style="color: var(--primary-emerald); font-weight: 700;">$${p.price.toFixed(2)}</td>
      <td><span class="tag-badge maglev">${p.badge}</span></td>
      <td>
        <button class="btn-danger-xs" onclick="deleteAdminProduct('${p.id}')">Remove</button>
      </td>
    </tr>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

async function acceptGardenerOrder(orderId) {
  const o = state.orders.find(ord => ord.id === orderId);
  if (o) {
    o.status = 'Accepted by Gardener - Levitating in Transit';
    localStorage.setItem('plantkart_orders', JSON.stringify(state.orders));

    try {
      await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: o.status })
      });
    } catch (e) {}

    renderGardenerPortal();
    showToast(`Order <strong>${o.id}</strong> ACCEPTED by Gardener!`);
  }
}

async function handleGardenerAddPlant() {
  const name = document.getElementById('g-p-name').value;
  const gardenId = document.getElementById('g-p-garden').value;
  const gardenObj = state.gardens.find(g => g.id === gardenId) || state.gardens[0];
  const category = document.getElementById('g-p-category').value;
  const price = parseFloat(document.getElementById('g-p-price').value);
  const badge = document.getElementById('g-p-badge').value || 'Gardener Verified';
  const image = document.getElementById('g-p-image').value;
  const desc = document.getElementById('g-p-desc').value || 'Cultivated with specialized magnetic bio-nutrients.';

  const newProd = {
    id: 'pk-gardener-' + Date.now(),
    name,
    gardenId: gardenObj.id,
    gardenName: gardenObj.name,
    gardenerName: gardenObj.owner,
    category,
    price,
    rating: 4.98,
    reviewsCount: 1,
    image,
    badge,
    light: 'bright',
    water: 'auto',
    pet: 'safe',
    dimensions: '25cm x 25cm x 30cm',
    levitationStability: '100% Lock',
    description: desc
  };

  PRODUCTS.unshift(newProd);

  try {
    await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProd)
    });
  } catch (e) {}

  renderProducts();
  renderGardenerPortal();
  showToast(`Added <strong>${name}</strong> at fixed rate $${price.toFixed(2)}!`);
  document.getElementById('gardener-add-plant-form').reset();
}

// --- 12. Super Admin Dashboard Engine ---
function openAdminDashboard() {
  renderAdminDashboard();
  adminModal.classList.remove('hidden');
}

function renderAdminDashboard() {
  document.getElementById('adm-stat-gardens').textContent = state.gardens.length;
  document.getElementById('adm-stat-products').textContent = PRODUCTS.length;
  const totalRev = state.orders.reduce((sum, o) => sum + o.total, 0);
  document.getElementById('adm-stat-revenue').textContent = `$${totalRev.toFixed(2)}`;
  document.getElementById('adm-stat-users').textContent = state.usersList.length;

  // Render Garden Selling & Revenue Table
  const revTableBody = document.getElementById('admin-revenue-table-body');
  revTableBody.innerHTML = state.gardens.map(g => {
    const gardenPlants = PRODUCTS.filter(p => p.gardenId === g.id);
    const gardenSales = state.orders.filter(o => o.gardenId === g.id).reduce((sum, o) => sum + o.total, 0) || (g.totalSales || 350.00);
    const platformFee = gardenSales * 0.15;

    return `
      <tr>
        <td><strong>${g.name}</strong></td>
        <td>${g.owner}</td>
        <td>${g.location}</td>
        <td>${gardenPlants.length || g.plantsCount} plants</td>
        <td style="color: var(--primary-emerald); font-weight: 700;">$${gardenSales.toFixed(2)}</td>
        <td style="color: #fbbf24; font-weight: 700;">$${platformFee.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  // Render Product Catalog Table
  const prodTableBody = document.getElementById('admin-products-table-body');
  prodTableBody.innerHTML = PRODUCTS.map(p => `
    <tr>
      <td>
        <img src="${p.image}" class="adm-thumb" alt="${p.name}" />
        <strong>${p.name}</strong>
      </td>
      <td>${p.gardenName || 'Zen Garden'}</td>
      <td><span class="tag-badge maglev">${p.category}</span></td>
      <td>$${p.price.toFixed(2)}</td>
      <td>
        <button class="btn-danger-xs" onclick="deleteAdminProduct('${p.id}')">Delete</button>
      </td>
    </tr>
  `).join('');

  // Render All Orders Table
  const ordersContainer = document.getElementById('admin-orders-list');
  ordersContainer.innerHTML = state.orders.map(o => `
    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 14px; border-radius: var(--radius-md); margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <strong>${o.id}</strong> — ${o.customer} (${o.gardenName || 'Zen Garden'})
        <div style="font-size: 0.8rem; color: var(--text-muted);">${o.date} | ${o.paymentMethod} | $${o.total.toFixed(2)}</div>
      </div>
      <div>
        <span class="status-tag ${o.status.includes('Transit') || o.status.includes('Accepted') ? 'transit' : 'delivered'}">${o.status}</span>
        <button class="btn btn-secondary btn-xs" style="margin-left: 8px;" onclick="toggleOrderStatus('${o.id}')">Toggle Status</button>
      </div>
    </div>
  `).join('');

  // Render Users Table
  const usersTableBody = document.getElementById('admin-users-table-body');
  usersTableBody.innerHTML = state.usersList.map(u => `
    <tr>
      <td><strong>${u.name}</strong></td>
      <td>${u.email}</td>
      <td><span class="tag-badge ${u.role === 'admin' ? 'maglev' : 'petsafe'}">${u.role.toUpperCase()}</span></td>
      <td>${u.points} pts</td>
      <td><span class="status-tag delivered">${u.status}</span></td>
    </tr>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

async function handleAdminAddGarden() {
  const name = document.getElementById('adm-g-name').value;
  const owner = document.getElementById('adm-g-owner').value;
  const location = document.getElementById('adm-g-location').value;
  const specialty = document.getElementById('adm-g-specialty').value || 'Botanical Floating Systems';

  const newGarden = {
    id: 'g-custom-' + Date.now(),
    name,
    owner,
    location,
    specialty,
    totalSales: 0.00,
    plantsCount: 0
  };

  state.gardens.unshift(newGarden);
  localStorage.setItem('plantkart_gardens', JSON.stringify(state.gardens));

  try {
    await fetch(`${API_BASE}/gardens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGarden)
    });
  } catch (e) {}

  renderAdminDashboard();
  showToast(`Registered new Garden: <strong>${name}</strong>`);
  document.getElementById('add-garden-form').reset();
}

async function deleteAdminProduct(id) {
  const idx = PRODUCTS.findIndex(p => p.id === id);
  if (idx !== -1) {
    const name = PRODUCTS[idx].name;
    PRODUCTS.splice(idx, 1);

    try {
      await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE'
      });
    } catch (e) {}

    renderProducts();
    renderAdminDashboard();
    showToast(`Deleted <strong>${name}</strong> from catalog.`);
  }
}

async function toggleOrderStatus(orderId) {
  const o = state.orders.find(ord => ord.id === orderId);
  if (o) {
    o.status = o.status.includes('Transit') ? 'Delivered' : 'Levitating in Transit';
    localStorage.setItem('plantkart_orders', JSON.stringify(state.orders));

    try {
      await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: o.status })
      });
    } catch (e) {}

    renderAdminDashboard();
    showToast(`Updated status for ${o.id}`);
  }
}

// --- 12. Quick View Modal Builder ---
function openQuickView(productId) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;

  const isWish = state.wishlist.has(p.id);

  quickviewContent.innerHTML = `
    <div class="qv-img-box">
      <img src="${p.image}" alt="${p.name}" />
    </div>

    <div class="qv-details">
      <span class="product-category">${p.category}</span>
      <h2>${p.name}</h2>

      <div class="product-rating" style="margin-bottom: 12px;">
        <span class="stars-text">★★★★★</span>
        <span>${p.rating} (${p.reviewsCount} verified reviews)</span>
      </div>

      <div class="qv-price">$${p.price.toFixed(2)}</div>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;">${p.description}</p>

      <div class="qv-spec-list">
        <div><strong>Levitation Field:</strong> ${p.levitationStability}</div>
        <div><strong>Dimensions:</strong> ${p.dimensions}</div>
        <div><strong>Light Specs:</strong> ${p.light.toUpperCase()} Light</div>
        <div><strong>Watering:</strong> ${p.water.toUpperCase()}</div>
      </div>

      <div style="display: flex; gap: 14px; align-items: center; margin-top: 24px;">
        <button class="btn btn-primary btn-glow" style="flex-grow: 1;" onclick="addToCart('${p.id}'); closeModals();">
          <i data-lucide="shopping-bag"></i>
          <span>Add to Cart</span>
        </button>
        <button class="icon-btn" onclick="toggleWishlist('${p.id}'); openQuickView('${p.id}');">
          <i data-lucide="heart" ${isWish ? 'fill="currentColor"' : ''}></i>
        </button>
      </div>
    </div>
  `;

  quickviewModal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

// --- 13. Plant Finder Quiz Assistant ---
function initQuizLogic() {
  const quizButtons = document.querySelectorAll('.quiz-btn');
  quizButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parent = e.target.closest('.quiz-options');
      parent.querySelectorAll('.quiz-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      evaluateQuiz();
    });
  });

  evaluateQuiz();
}

function evaluateQuiz() {
  const light = document.querySelector('.quiz-btn.active[data-param="light"]')?.dataset.val || 'low';
  const water = document.querySelector('.quiz-btn.active[data-param="water"]')?.dataset.val || 'auto';
  const pet = document.querySelector('.quiz-btn.active[data-param="pet"]')?.dataset.val || 'safe';

  let match = PRODUCTS.find(p => p.pet === pet && p.light === light) || PRODUCTS[0];

  quizRecommendedCard.innerHTML = `
    <div class="product-card" style="margin:0;">
      <div class="product-img-box" style="height: 180px;">
        <img src="${match.image}" alt="${match.name}" />
      </div>
      <div class="product-info">
        <span class="product-category">${match.category}</span>
        <h4 style="font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 6px;">${match.name}</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">Matched for ${light} light & ${pet === 'safe' ? 'Pet safe spaces' : 'General care'}.</p>
        <div class="product-footer">
          <span class="price-tag">$${match.price.toFixed(2)}</span>
          <button class="add-cart-btn" onclick="addToCart('${match.id}')">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

// --- 14. Mouse 3D Parallax Tilt Physics ---
function initParallaxEffect() {
  const heroCard = document.getElementById('hero-levitation-card');
  const heroPlantImg = document.getElementById('hero-plant-img');
  if (!heroCard || !heroPlantImg) return;

  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = (clientX - centerX) / 30;
    const moveY = (clientY - centerY) / 30;

    heroCard.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
    heroPlantImg.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
  });
}

// --- 15. Toast Notification Banner ---
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i data-lucide="check-circle-2" style="color: var(--primary-emerald); width: 20px; height: 20px;"></i>
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- 16. Event Listeners Setup ---
function setupEventListeners() {
  cartBtn.addEventListener('click', () => cartDrawer.classList.remove('hidden'));
  cartClose.addEventListener('click', () => cartDrawer.classList.add('hidden'));

  wishlistBtn.addEventListener('click', () => wishlistModal.classList.remove('hidden'));
  wishlistClose.addEventListener('click', () => wishlistModal.classList.add('hidden'));

  profileBtn.addEventListener('click', () => profileModal.classList.remove('hidden'));
  profileClose.addEventListener('click', () => profileModal.classList.add('hidden'));

  loginNavBtn.addEventListener('click', () => loginModal.classList.remove('hidden'));
  loginClose.addEventListener('click', () => loginModal.classList.add('hidden'));
  logoutNavBtn?.addEventListener('click', logoutUser);

  navAdminLink.addEventListener('click', (e) => {
    e.preventDefault();
    openAdminDashboard();
  });
  adminClose.addEventListener('click', () => adminModal.classList.add('hidden'));

  navGardenerLink.addEventListener('click', (e) => {
    e.preventDefault();
    openGardenerPortal();
  });
  gardenerClose?.addEventListener('click', () => gardenerModal.classList.add('hidden'));

  quickviewClose.addEventListener('click', () => quickviewModal.classList.add('hidden'));
  checkoutClose.addEventListener('click', () => checkoutModal.classList.add('hidden'));
  checkoutFinishBtn.addEventListener('click', () => closeModals());

  if (demoVideoBtn) demoVideoBtn.addEventListener('click', () => videoModal.classList.remove('hidden'));
  if (videoClose) videoClose.addEventListener('click', () => videoModal.classList.add('hidden'));

  // Close overlays on clicking background backdrop
  [cartDrawer, wishlistModal, quickviewModal, profileModal, loginModal, gardenerModal, adminModal, checkoutModal, videoModal].forEach(overlay => {
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay && overlay !== entryGateModal) overlay.classList.add('hidden');
      });
    }
  });

  // Gardener Portal Tab Switcher
  document.querySelectorAll('.gardener-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.dataset.tab;
      document.querySelectorAll('.gardener-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.gardener-panel').forEach(p => p.classList.add('hidden'));
      e.currentTarget.classList.add('active');
      document.getElementById(`gardener-panel-${targetTab}`)?.classList.remove('hidden');
    });
  });

  // Auth Modal Tab Switcher
  document.getElementById('auth-tab-login').addEventListener('click', () => {
    document.getElementById('auth-tab-login').classList.add('active');
    document.getElementById('auth-tab-register').classList.remove('active');
    document.getElementById('auth-panel-login').classList.remove('hidden');
    document.getElementById('auth-panel-register').classList.add('hidden');
  });

  document.getElementById('auth-tab-register').addEventListener('click', () => {
    document.getElementById('auth-tab-register').classList.add('active');
    document.getElementById('auth-tab-login').classList.remove('active');
    document.getElementById('auth-panel-register').classList.remove('hidden');
    document.getElementById('auth-panel-login').classList.add('hidden');
  });

  // Admin Dashboard Tab Switcher
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.dataset.tab;
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.add('hidden'));
      e.currentTarget.classList.add('active');
      document.getElementById(`admin-panel-${targetTab}`)?.classList.remove('hidden');
    });
  });

  // Payment Tabs Listener in Checkout
  document.querySelectorAll('.pay-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const method = e.currentTarget.dataset.method;
      state.paymentMethod = method;
      document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.pay-panel').forEach(p => p.classList.add('hidden'));
      e.currentTarget.classList.add('active');
      document.getElementById(`pay-panel-${method}`)?.classList.remove('hidden');
    });
  });

  // Search Bar Auto-Complete
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim();
    if (state.searchQuery.length > 0) {
      searchClear.classList.remove('hidden');
      showSearchSuggestions(state.searchQuery);
    } else {
      searchClear.classList.add('hidden');
      searchSuggestions.classList.add('hidden');
    }
    renderProducts();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    searchClear.classList.add('hidden');
    searchSuggestions.classList.add('hidden');
    renderProducts();
  });

  // Sort & Category Selection
  sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  categoryPills.addEventListener('click', (e) => {
    const pill = e.target.closest('.cat-pill');
    if (!pill) return;
    document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    state.category = pill.dataset.category;
    renderProducts();
  });

  // Promo Code Engine
  document.getElementById('promo-apply-btn').addEventListener('click', () => {
    const promoVal = document.getElementById('promo-input').value.trim().toUpperCase();
    const promoMsg = document.getElementById('promo-msg');
    if (promoVal === 'ANTIGRAVITY10') {
      state.appliedPromo = 'ANTIGRAVITY10';
      promoMsg.className = 'promo-msg success';
      promoMsg.textContent = '✓ 10% Zero-G discount applied!';
      updateCartUI();
    } else {
      promoMsg.className = 'promo-msg error';
      promoMsg.textContent = 'Invalid promo code. Try: ANTIGRAVITY10';
    }
  });

  // Checkout Launch
  checkoutBtn.addEventListener('click', openCheckoutModal);

  // Wishlist card delegation
  productGrid.addEventListener('click', (e) => {
    const wishToggle = e.target.closest('.wishlist-toggle');
    if (wishToggle) {
      const id = wishToggle.dataset.id;
      toggleWishlist(id);
    }
  });

  // Newsletter Form
  document.getElementById('newsletter-btn')?.addEventListener('click', () => {
    const email = document.getElementById('newsletter-input')?.value;
    if (email && email.includes('@')) {
      showToast('Thank you for subscribing to Zero-G Drops!');
      document.getElementById('newsletter-input').value = '';
    } else {
      showToast('Please enter a valid email address.');
    }
  });

  // Back to Top button
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function showSearchSuggestions(query) {
  const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4);
  if (matches.length === 0) {
    searchSuggestions.classList.add('hidden');
    return;
  }

  searchSuggestions.innerHTML = matches.map(m => `
    <div class="search-item" onclick="openQuickView('${m.id}'); searchSuggestions.classList.add('hidden');">
      <img src="${m.image}" alt="${m.name}" />
      <div class="search-item-info">
        <strong>${m.name}</strong>
        <span>$${m.price.toFixed(2)}</span>
      </div>
    </div>
  `).join('');

  searchSuggestions.classList.remove('hidden');
}

function closeModals() {
  document.querySelectorAll('.drawer-overlay, .modal-overlay').forEach(el => el.classList.add('hidden'));
}

