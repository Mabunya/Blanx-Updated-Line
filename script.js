/* ============================================================
   BLNK — INTERACTIONS
   Cart, filtering, product modal, search, WhatsApp checkout
   ============================================================ */

const WHATSAPP_NUMBER = "254104273995";

/* ============================================================
   PRODUCT DATA
   ============================================================ */
const PRODUCTS = [
  {
    id: "cap-001",
    name: "Zero Cap",
    price: 1200,
    category: "caps",
    badge: "NEW",
    desc: "Six-panel structured cap. Flat brim, tonal stitching, adjustable strap.",
    colors: ["#111111", "#e6e2d8", "#8a8a8a"],
    sizes: ["ONE SIZE"],
    icon: "cap"
  },
  {
    id: "cap-002",
    name: "BLNK Dad Cap",
    price: 1000,
    category: "caps",
    desc: "Unstructured cotton twill, curved brim, soft-washed finish.",
    colors: ["#2a2a2a", "#c8c2b4", "#4a5a3a"],
    sizes: ["ONE SIZE"],
    icon: "cap"
  },
  {
    id: "cap-003",
    name: "Trucker Snap",
    price: 1400,
    category: "caps",
    desc: "Mesh back, foam front, snap closure. Everyday trucker.",
    colors: ["#111", "#d4cec2"],
    sizes: ["ONE SIZE"],
    icon: "cap"
  },
  {
    id: "sneaker-001",
    name: "Air Force 1",
    price: 2000,
    category: "sneakers",
    badge: "HOT",
    desc: "Classic silhouette, full-grain leather, Air cushioning.",
    colors: ["#ffffff", "#111111"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    icon: "sneaker"
  },
  {
    id: "sneaker-002",
    name: "Jordan 4 Retro",
    price: 3500,
    category: "sneakers",
    desc: "Iconic flight silhouette with visible Air unit and premium suede overlays.",
    colors: ["#111111", "#5a5a5a"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    icon: "sneaker"
  },
  {
    id: "sneaker-003",
    name: "Nike TN",
    price: 3600,
    category: "sneakers",
    desc: "Tuned Air cushioning, aggressive tread, statement colourways.",
    colors: ["#111111", "#e2722b"],
    sizes: ["41", "42", "43", "44"],
    icon: "sneaker"
  },
  {
    id: "sneaker-004",
    name: "Air Max 97",
    price: 3300,
    category: "sneakers",
    desc: "Full-length Air, ripple design, water-ripple inspired upper.",
    colors: ["#e8e3d7", "#8a8a8a", "#4a5a3a"],
    sizes: ["41", "42", "43", "44"],
    icon: "sneaker"
  },
  {
    id: "hoodie-001",
    name: "Zero Zip Hoodie",
    price: 3200,
    category: "hoodies",
    badge: "NEW",
    desc: "Heavyweight fleece, full-zip front, tonal hardware. Built to layer.",
    colors: ["#111111", "#2a2a2a", "#e6e2d8"],
    sizes: ["S", "M", "L", "XL"],
    icon: "hoodie"
  },
  {
    id: "hoodie-002",
    name: "Raw Pullover",
    price: 2800,
    category: "hoodies",
    desc: "Mid-weight pullover hoodie. Kangaroo pocket, raw edges, no logo.",
    colors: ["#111111", "#8a8a8a", "#c8c2b4"],
    sizes: ["S", "M", "L", "XL"],
    icon: "hoodie"
  },
  {
    id: "hoodie-003",
    name: "Block Hood",
    price: 3400,
    category: "hoodies",
    desc: "Oversized fit, dropped shoulders, ribbed cuffs and hem.",
    colors: ["#111111", "#d4cec2"],
    sizes: ["M", "L", "XL"],
    icon: "hoodie"
  },
  {
    id: "tee-001",
    name: "Raw Tee",
    price: 1500,
    category: "tees",
    desc: "260gsm combed cotton, boxy fit, garment-dyed.",
    colors: ["#111111", "#ffffff", "#c8c2b4"],
    sizes: ["S", "M", "L", "XL"],
    icon: "tee"
  },
  {
    id: "tee-002",
    name: "Blank Tee",
    price: 1400,
    category: "tees",
    desc: "Everyday essential. Soft-washed, no logo, no rules.",
    colors: ["#ffffff", "#111111", "#8a8a8a"],
    sizes: ["S", "M", "L", "XL"],
    icon: "tee"
  },
  {
    id: "jacket-001",
    name: "Block Jacket",
    price: 5500,
    category: "jackets",
    desc: "Technical shell, water-repellent finish, taped seams.",
    colors: ["#111111", "#1a3a5a"],
    sizes: ["S", "M", "L", "XL"],
    icon: "jacket"
  },
  {
    id: "jacket-002",
    name: "Utility Overshirt",
    price: 4200,
    category: "jackets",
    desc: "Cotton-twill overshirt. Chest pockets, boxy cut.",
    colors: ["#4a5a3a", "#111111", "#c8c2b4"],
    sizes: ["S", "M", "L", "XL"],
    icon: "jacket"
  }
];

/* ============================================================
   ICON SVGS (simple silhouettes for placeholder images)
   ============================================================ */
function iconSvg(type, color) {
  const c = color || "#2a2a2a";
  const common = `fill="${c}"`;

  const icons = {
    cap: `<svg viewBox="0 0 100 100"><path ${common} d="M20 60 C20 40 30 25 50 25 C70 25 80 40 80 60 L80 62 L20 62 Z"/><path ${common} d="M20 62 L12 62 C12 70 20 74 30 74 L80 74 L80 62 Z"/></svg>`,
    sneaker: `<svg viewBox="0 0 100 100"><path ${common} d="M10 65 L10 55 C10 50 15 48 20 48 L32 48 L40 35 C42 32 46 30 50 32 L58 38 C62 42 68 46 76 48 L86 52 C90 54 90 58 90 62 L90 68 C90 72 88 74 84 74 L16 74 C12 74 10 72 10 68 Z"/><path fill="rgba(255,255,255,0.3)" d="M20 68 L80 68 L80 71 L20 71 Z"/></svg>`,
    hoodie: `<svg viewBox="0 0 100 100"><path ${common} d="M28 25 C28 18 34 14 42 14 L58 14 C66 14 72 18 72 25 L72 32 L82 38 L82 50 L76 50 L76 82 C76 86 72 88 68 88 L32 88 C28 88 24 86 24 82 L24 50 L18 50 L18 38 Z"/><path fill="rgba(0,0,0,0.25)" d="M42 14 C42 22 46 26 50 26 C54 26 58 22 58 14 Z"/><path stroke="rgba(0,0,0,0.3)" stroke-width="1.4" fill="none" d="M50 34 L50 60"/></svg>`,
    tee: `<svg viewBox="0 0 100 100"><path ${common} d="M30 22 L42 18 C44 24 48 26 50 26 C52 26 56 24 58 18 L70 22 L82 34 L74 44 L68 40 L68 84 L32 84 L32 40 L26 44 L18 34 Z"/></svg>`,
    jacket: `<svg viewBox="0 0 100 100"><path ${common} d="M30 20 L42 16 L50 30 L58 16 L70 20 L80 32 L76 44 L70 42 L70 86 L30 86 L30 42 L24 44 L20 32 Z"/><path stroke="rgba(255,255,255,0.35)" stroke-width="1.4" fill="none" d="M50 30 L50 84"/></svg>`
  };
  return icons[type] || icons.tee;
}

/* ============================================================
   STATE
   ============================================================ */
let cart = JSON.parse(localStorage.getItem("blnk-cart") || "[]");
let activeFilter = "all";
let activeProduct = null;
let selectedColor = null;
let selectedSize = null;

/* ============================================================
   PRODUCT GRID RENDER
   ============================================================ */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("gridEmpty");

  const filtered = activeFilter === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter);

  if (filtered.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  grid.innerHTML = filtered.map(p => `
    <article class="product" onclick="openProduct('${p.id}')">
      <div class="product-image">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        ${iconSvg(p.icon, p.colors[0])}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-price">KES ${p.price.toLocaleString()}</div>
        <div class="product-colors">
          ${p.colors.map(c => `<span class="color-dot" style="background:${c}"></span>`).join("")}
        </div>
      </div>
    </article>
  `).join("");
}

/* ============================================================
   FILTER
   ============================================================ */
document.querySelectorAll(".cat-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeFilter = tab.dataset.filter;
    renderProducts();
  });
});

document.querySelectorAll("[data-filter]").forEach(link => {
  if (link.classList.contains("cat-tab")) return;
  link.addEventListener("click", (e) => {
    const f = link.dataset.filter;
    if (!f) return;
    const matchingTab = document.querySelector(`.cat-tab[data-filter="${f}"]`);
    if (matchingTab) {
      document.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
      matchingTab.classList.add("active");
      activeFilter = f;
      renderProducts();
    }
  });
});

/* ============================================================
   PRODUCT MODAL
   ============================================================ */
function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  activeProduct = p;
  selectedColor = p.colors[0];
  selectedSize = p.sizes[Math.min(1, p.sizes.length - 1)];

  const content = document.getElementById("modalContent");
  content.innerHTML = `
    <div class="modal-image">${iconSvg(p.icon, selectedColor)}</div>
    <div class="modal-info">
      <span class="modal-cat">${p.category.toUpperCase()}</span>
      <h2 class="modal-name">${p.name}</h2>
      <div class="modal-price">KES ${p.price.toLocaleString()}</div>
      <p class="modal-desc">${p.desc}</p>

      <div class="modal-label">COLOUR</div>
      <div class="modal-colors">
        ${p.colors.map((c, i) => `
          <button class="modal-color ${i === 0 ? "active" : ""}"
                  style="background:${c}"
                  onclick="pickColor('${c}', this)"></button>
        `).join("")}
      </div>

      <div class="modal-label">SIZE</div>
      <div class="modal-sizes">
        ${p.sizes.map((s, i) => `
          <button class="modal-size ${i === Math.min(1, p.sizes.length - 1) ? "active" : ""}"
                  onclick="pickSize('${s}', this)">${s}</button>
        `).join("")}
      </div>

      <div class="modal-actions">
        <button class="btn-add" onclick="addToCartFromModal()">ADD TO CART</button>
        <button class="btn-wa-modal" onclick="askOnWhatsApp()">ASK ON WHATSAPP</button>
      </div>
    </div>
  `;

  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function pickColor(color, btn) {
  selectedColor = color;
  document.querySelectorAll(".modal-color").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const img = document.querySelector(".modal-image");
  if (img) img.innerHTML = iconSvg(activeProduct.icon, color);
}

function pickSize(size, btn) {
  selectedSize = size;
  document.querySelectorAll(".modal-size").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function closeModal(e) {
  if (e) e.stopPropagation();
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function addToCartFromModal() {
  if (!activeProduct) return;

  const key = `${activeProduct.id}-${selectedColor}-${selectedSize}`;
  const existing = cart.find(i => i.key === key);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      key,
      id: activeProduct.id,
      name: activeProduct.name,
      price: activeProduct.price,
      color: selectedColor,
      size: selectedSize,
      qty: 1,
      icon: activeProduct.icon
    });
  }

  saveCart();
  renderCart();
  closeModal();
  openCart();
}

function askOnWhatsApp() {
  if (!activeProduct) return;
  const msg = `Hi, I'm interested in *${activeProduct.name}* (KES ${activeProduct.price.toLocaleString()}) — colour: ${selectedColor}, size: ${selectedSize}. Is it available?`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

/* ============================================================
   CART
   ============================================================ */
function saveCart() {
  localStorage.setItem("blnk-cart", JSON.stringify(cart));
}

function renderCart() {
  const items = document.getElementById("cartItems");
  const empty = document.getElementById("cartEmpty");
  const footer = document.getElementById("cartFooter");
  const count = document.getElementById("cartCount");

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  count.textContent = totalQty;

  if (cart.length === 0) {
    items.innerHTML = "";
    empty.style.display = "flex";
    footer.style.display = "none";
    return;
  }

  empty.style.display = "none";
  footer.style.display = "block";

  items.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${iconSvg(item.icon, item.color)}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.color} · ${item.size}</div>
        <div class="cart-qty">
          <button onclick="changeQty('${item.key}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.key}', 1)">+</button>
        </div>
        <div class="cart-item-price">KES ${(item.price * item.qty).toLocaleString()}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.key}')">Remove</button>
    </div>
  `).join("");

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById("cartSubtotal").textContent = `KES ${subtotal.toLocaleString()}`;
}

function changeQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.key !== key);
  saveCart();
  renderCart();
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  renderCart();
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

function checkoutWhatsApp() {
  if (cart.length === 0) return;

  let msg = "Hi, I'd like to place an order:\n\n";
  let total = 0;

  cart.forEach((item, i) => {
    msg += `*${i + 1}. ${item.name}*\n`;
    msg += `Colour: ${item.color} | Size: ${item.size}\n`;
    msg += `Qty: ${item.qty} × KES ${item.price.toLocaleString()} = KES ${(item.price * item.qty).toLocaleString()}\n\n`;
    total += item.price * item.qty;
  });

  msg += `*TOTAL: KES ${total.toLocaleString()}*\n\n`;
  msg += `Name: \nDelivery location: \nPreferred payment: M-Pesa`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

/* ============================================================
   SEARCH
   ============================================================ */
function toggleSearch() {
  const el = document.getElementById("searchOverlay");
  el.classList.toggle("open");
  if (el.classList.contains("open")) {
    setTimeout(() => document.getElementById("searchInput").focus(), 100);
  } else {
    document.getElementById("searchInput").value = "";
    document.getElementById("searchResults").innerHTML = "";
  }
}

function handleSearch(q) {
  const results = document.getElementById("searchResults");
  const query = q.trim().toLowerCase();
  if (!query) { results.innerHTML = ""; return; }

  const matches = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    results.innerHTML = `<p style="color:#999;font-size:13px;">No results for "${q}"</p>`;
    return;
  }

  results.innerHTML = matches.map(p => `
    <div class="search-result-item" onclick="toggleSearch();openProduct('${p.id}')">
      <span>${p.name}</span>
      <span class="price">KES ${p.price.toLocaleString()}</span>
    </div>
  `).join("");
}

/* ============================================================
   STICKY HEADER
   ============================================================ */
window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (window.scrollY > 10) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

/* ============================================================
   INIT
   ============================================================ */
renderProducts();
renderCart();