/* PRODUCT PAGE — pages/product.html?id=hoodie-001 */
let currentProduct = null, currentColor = null, currentSize = null;

function renderProductPage() {
  const id = new URLSearchParams(location.search).get("id");
  const p = PRODUCTS.find(x => x.id === id);
  const box = document.getElementById("productDetail");

  if (!p) {
    box.innerHTML = `<div class="not-found"><h2>Product not found</h2>
      <p>The product you're looking for doesn't exist or has been removed.</p>
      <a href="../index.html#shop" class="btn-outline dark">BACK TO SHOP</a></div>`;
    return;
  }

  currentProduct = p;
  currentColor = p.colors[0];
  const defaultSize = Math.min(1, p.sizes.length - 1);
  currentSize = p.sizes[defaultSize];

  document.title = `${p.name} — BLANX`;
  document.getElementById("breadName").textContent = p.name.toUpperCase();
  document.getElementById("breadCat").textContent = p.category.toUpperCase();

  box.innerHTML = `
    <div class="gallery">
      <div class="gallery-main" id="galleryMain">${productVisual(p, currentColor)}</div>
      <div class="gallery-thumbs">${p.colors.map((c, i) =>
        `<div class="gallery-thumb ${i === 0 ? "active" : ""}" onclick="selectColor('${c}')">${iconSvg(p.icon, c)}</div>`).join("")}</div>
    </div>
    <div class="detail-info">
      <div class="detail-cat">${p.category.toUpperCase()}</div>
      <h1 class="detail-name">${p.name}</h1>
      <div class="detail-price">${money(p.price)}</div>
      <p class="detail-desc">${p.desc}</p>

      <div class="detail-label">COLOUR</div>
      <div class="detail-colors">${p.colors.map((c, i) =>
        `<button class="detail-color ${i === 0 ? "active" : ""}" data-color="${c}" style="background:${c}" onclick="selectColor('${c}')"></button>`).join("")}</div>

      <div class="detail-label">SIZE</div>
      <div class="detail-sizes">${p.sizes.map((s, i) =>
        `<button class="detail-size ${i === defaultSize ? "active" : ""}" onclick="selectSize('${s}', this)">${s}</button>`).join("")}</div>

      <div class="detail-actions">
        <button class="btn-add" onclick="addCurrentToCart()">ADD TO CART</button>
        <button class="btn-wa-modal" onclick="askOnWhatsApp()">ASK ON WHATSAPP</button>
      </div>

      <div class="detail-accordion">
        ${accordion("DELIVERY &amp; RETURNS", "Nationwide delivery in 1–3 business days. Free returns within 7 days on unworn items.")}
        ${accordion("PAYMENT", "M-Pesa, cash on delivery, and card accepted. Order confirmation sent via WhatsApp.")}
        ${accordion("SIZE GUIDE", "Sneakers: EU sizes. Apparel: standard UK sizes. Not sure? Message us on WhatsApp for sizing help.")}
      </div>
    </div>`;
}

const accordion = (title, body) => `
  <div class="detail-acc-item">
    <button class="detail-acc-head" onclick="toggleAcc(this)"><span>${title}</span><span>+</span></button>
    <div class="detail-acc-body">${body}</div>
  </div>`;

function selectColor(color) {
  currentColor = color;
  document.querySelectorAll(".detail-color").forEach(b => b.classList.toggle("active", b.dataset.color === color));
  document.querySelectorAll(".gallery-thumb").forEach((t, i) => t.classList.toggle("active", currentProduct.colors[i] === color));
  document.getElementById("galleryMain").innerHTML = productVisual(currentProduct, color);
}
function selectSize(size, btn) {
  currentSize = size;
  document.querySelectorAll(".detail-size").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}
function addCurrentToCart() {
  if (!currentProduct) return;
  addToCart({ id: currentProduct.id, name: currentProduct.name, price: currentProduct.price,
              color: currentColor, size: currentSize, icon: currentProduct.icon,
              imageUrl: currentProduct.imageUrl || null });
}
function askOnWhatsApp() {
  const p = currentProduct;
  const msg = `Hi, I'm interested in *${p.name}* (${money(p.price)}) — colour: ${currentColor}, size: ${currentSize}. Is it available?`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}
function toggleAcc(btn) {
  const item = btn.parentElement;
  item.classList.toggle("open");
  btn.querySelector("span:last-child").textContent = item.classList.contains("open") ? "−" : "+";
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();
  renderProductPage();
});
