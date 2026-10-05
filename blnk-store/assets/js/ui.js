/* ============================================================
   UI — shared layout (header/footer), cart drawer, product modal,
   search. Injected on every page so the HTML files stay small.
   ============================================================ */
let activeProduct = null, selectedColor = null, selectedSize = null;

/* ---------- Layout ---------- */
function layoutTop() {
  const b = BLANX.base;
  return `
  <div class="announce"><span>GET 10% OFF — USE CODE <strong>BLANX10</strong> AT CHECKOUT</span></div>
  <header class="site-header">
    <nav class="nav nav-left" id="mainNav" aria-label="Main navigation">
      <a href="${b}index.html">Home</a>
      <a href="${b}index.html#shop">Shop</a>
      <a href="${b}index.html#lookbook">Lookbook</a>
      <a href="${b}index.html#about">About</a>
      <a href="${b}index.html#contact">Contact</a>
    </nav>
    <a href="${b}index.html" class="logo" aria-label="BLANX home">BLANX</a>
    <div class="header-actions">
      <button class="icon-btn" aria-label="Search" onclick="toggleSearch()">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/></svg>
      </button>
      <button class="icon-btn cart-btn" aria-label="Cart" onclick="openCart()">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16l-1.5 12h-13z"/><path d="M9 6V4a3 3 0 0 1 6 0v2"/></svg>
        <span class="cart-count">0</span>
      </button>
    </div>
    <button class="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="toggleMainNav(this)"><span></span><span></span></button>
  </header>`;
}

function layoutBottom() {
  const b = BLANX.base;
  return `
  <section class="service-strip" aria-label="BLANX service information">
    <div class="service-strip-inner">
      <div class="service-item">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M10 17h4V5H2v12h3"/><path d="M14 9h4l4 4v4h-3"/><circle cx="7" cy="17" r="2"/><path d="M14 17h-5"/><circle cx="17" cy="17" r="2"/></svg>
        <h3>NATIONWIDE DELIVERY</h3>
        <p>We ship anywhere in Kenya. Nairobi order? Message us and we'll share the delivery day.</p>
      </div>
      <div class="service-item">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        <h3>ORDER CONFIRMATION</h3>
        <p>We confirm your size, colour, and price on WhatsApp before it leaves.</p>
      </div>
      <div class="service-item">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>
        <h3>FLEXIBLE PAYMENT</h3>
        <p>M-Pesa, card, or pay when it lands at your door.</p>
      </div>
    </div>
  </section>
  <footer class="site-footer" id="contact">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="logo">BLANX</div>
        <p class="footer-tagline">Clean pieces.<br>No noise.</p>
        <a class="footer-contact-link" href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">Message us directly <span aria-hidden="true">↗</span></a>
      </div>
      <div class="footer-column">
        <h4>CONTACT</h4>
        <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">WhatsApp us</a>
        <p>Order questions and updates</p>
      </div>
      <div class="footer-column">
        <h4>HELP</h4>
        <a href="${b}index.html#about">Delivery information</a>
        <a href="${b}pages/checkout.html">Payment options</a>
        <a href="${b}pages/cart.html">Your cart</a>
      </div>
      <div class="footer-column">
        <h4>SHOP</h4>
        <a href="${b}index.html#shop">All products</a>
        <a href="${b}index.html#capsSection">Caps</a>
        <a href="${b}index.html#sneakersSection">Sneakers</a>
        <a href="${b}index.html#hoodiesSection">Hoodies</a>
      </div>
    </div>
    <div class="footer-base">© ${new Date().getFullYear()} BLANX. All rights reserved.</div>
  </footer>

  <div class="search-overlay" id="searchOverlay">
    <div class="search-box">
      <button class="cart-close" onclick="toggleSearch()" aria-label="Close search">×</button>
      <input id="searchInput" type="text" placeholder="Search products…" oninput="handleSearch(this.value)" autocomplete="off" />
      <div id="searchResults"></div>
    </div>
  </div>

  <div class="cart-overlay" id="cartOverlay" onclick="closeCart()"></div>
  <aside class="cart-drawer" id="cartDrawer" aria-label="Cart">
    <div class="cart-header"><h3>YOUR CART</h3><button class="cart-close" onclick="closeCart()" aria-label="Close cart">×</button></div>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-empty" id="cartEmpty">
      <p>Your cart is empty.</p>
      <button class="btn-outline dark" onclick="closeCart()">CONTINUE SHOPPING</button>
    </div>
    <div class="cart-footer" id="cartFooter" style="display:none;">
      <div class="cart-row"><span>Subtotal</span><span id="cartSubtotal">KES 0</span></div>
      <div class="cart-row small"><span>Delivery calculated at checkout</span></div>
      <a href="${b}pages/checkout.html" class="btn-checkout">PROCEED TO CHECKOUT</a>
      <button class="btn-checkout wa" onclick="checkoutWhatsApp()">QUICK ORDER ON WHATSAPP</button>
      <p class="cart-note">You'll be redirected to WhatsApp with your order details.</p>
    </div>
  </aside>

  <div class="modal-overlay" id="modalOverlay" onclick="closeModal(event)">
    <div class="modal" onclick="event.stopPropagation()">
      <button class="modal-close" onclick="closeModal(event)" aria-label="Close">×</button>
      <div class="modal-content" id="modalContent"></div>
    </div>
  </div>`;
}

function injectLayout() {
  if (document.getElementById("cartDrawer")) return;
  document.body.insertAdjacentHTML("afterbegin", layoutTop());
  document.body.insertAdjacentHTML("beforeend", layoutBottom());
}

function toggleMainNav(button) {
  const nav = document.getElementById("mainNav");
  const isOpen = nav.classList.toggle("open");
  button.setAttribute("aria-expanded", String(isOpen));
}

/* ---------- Cart drawer ---------- */
function renderCartDrawer() {
  const items = document.getElementById("cartItems");
  if (!items) return;
  const empty = document.getElementById("cartEmpty");
  const footer = document.getElementById("cartFooter");

  if (!cart.length) { items.innerHTML = ""; empty.style.display = "flex"; footer.style.display = "none"; return; }
  empty.style.display = "none"; footer.style.display = "block";

  items.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.imageUrl ? productVisual(item) : iconSvg(item.icon, item.color)}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${swatch(item.color)} ${item.size}</div>
        <div class="cart-qty">
          <button onclick="changeQty('${item.key}', -1)">−</button><span>${item.qty}</span><button onclick="changeQty('${item.key}', 1)">+</button>
        </div>
        <div class="cart-item-price">${money(item.price * item.qty)}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.key}')">Remove</button>
    </div>`).join("");
  document.getElementById("cartSubtotal").textContent = money(cartTotal());
}

function openCart() {
  document.getElementById("cartDrawer")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("open");
  document.body.style.overflow = "";
}

/* ---------- Product quick-view modal ---------- */
function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  activeProduct = p;
  selectedColor = p.colors[0];
  const defaultSize = Math.min(1, p.sizes.length - 1);
  selectedSize = p.sizes[defaultSize];

  document.getElementById("modalContent").innerHTML = `
    <div class="modal-image">${productVisual(p, selectedColor)}</div>
    <div class="modal-info">
      <span class="modal-cat">${p.category.toUpperCase()}</span>
      <h2 class="modal-name">${p.name}</h2>
      <div class="modal-price">${money(p.price)}</div>
      <p class="modal-desc">${p.desc}</p>
      <div class="modal-label">COLOUR</div>
      <div class="modal-colors">${p.colors.map((c, i) =>
        `<button class="modal-color ${i === 0 ? "active" : ""}" style="background:${c}" onclick="pickColor('${c}', this)"></button>`).join("")}</div>
      <div class="modal-label">SIZE</div>
      <div class="modal-sizes">${p.sizes.map((s, i) =>
        `<button class="modal-size ${i === defaultSize ? "active" : ""}" onclick="pickSize('${s}', this)">${s}</button>`).join("")}</div>
      <div class="modal-actions">
        <button class="btn-add" onclick="addToCartFromModal()">ADD TO CART</button>
        <a href="${BLANX.base}pages/product.html?id=${p.id}" class="btn-wa-modal">VIEW FULL DETAILS</a>
      </div>
    </div>`;
  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function pickColor(color, btn) {
  selectedColor = color;
  document.querySelectorAll(".modal-color").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const img = document.querySelector(".modal-image");
  if (img && activeProduct) img.innerHTML = productVisual(activeProduct, color);
}
function pickSize(size, btn) {
  selectedSize = size;
  document.querySelectorAll(".modal-size").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}
function closeModal(e) {
  if (e) e.stopPropagation();
  document.getElementById("modalOverlay")?.classList.remove("open");
  document.body.style.overflow = "";
}
function addToCartFromModal() {
  if (!activeProduct) return;
  addToCart({ id: activeProduct.id, name: activeProduct.name, price: activeProduct.price,
              color: selectedColor, size: selectedSize, icon: activeProduct.icon,
              imageUrl: activeProduct.imageUrl || null });
  closeModal();
}

/* ---------- Search ---------- */
function toggleSearch() {
  const el = document.getElementById("searchOverlay");
  el.classList.toggle("open");
  if (el.classList.contains("open")) setTimeout(() => document.getElementById("searchInput").focus(), 100);
  else { document.getElementById("searchInput").value = ""; document.getElementById("searchResults").innerHTML = ""; }
}

function handleSearch(q) {
  const out = document.getElementById("searchResults");
  const query = (q || "").trim().toLowerCase();
  if (!query) { out.innerHTML = ""; return; }
  const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
  out.innerHTML = matches.length
    ? matches.map(p => `<div class="search-result-item" onclick="goToProduct('${p.id}')"><span>${p.name}</span><span class="price">${money(p.price)}</span></div>`).join("")
    : `<p class="search-none">No results for "${q}"</p>`;
}

/* On the home page open the quick-view, elsewhere go to the product page */
function goToProduct(id) {
  toggleSearch();
  if (document.getElementById("productGrid")) openProduct(id);
  else location.href = `${BLANX.base}pages/product.html?id=${id}`;
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  injectLayout();
  syncCartUI();
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 10));
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    closeCart(); closeModal();
    if (document.getElementById("searchOverlay").classList.contains("open")) toggleSearch();
  });
});
