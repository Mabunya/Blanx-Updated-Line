/* ============================================================
   CART — state, persistence, quick WhatsApp order
   ============================================================ */
let cart = [];
let cartNeedsImageRefresh = false;
try {
  const storedCart = JSON.parse(localStorage.getItem("blnk-cart") || "[]");
  cart = storedCart.map(item => {
    const product = PRODUCTS.find(current => current.id === item.id);
    if (!product) return item;
    const imageUrl = product.imageUrl || null;
    if (item.imageUrl !== imageUrl || item.icon !== product.icon) cartNeedsImageRefresh = true;
    return { ...item, imageUrl, icon: product.icon };
  });
} catch (e) { cart = []; }

const saveCart  = () => localStorage.setItem("blnk-cart", JSON.stringify(cart));
const cartQty   = () => cart.reduce((s, i) => s + i.qty, 0);
const cartTotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
if (cartNeedsImageRefresh) saveCart();

function addToCart(item) {
  const key = `${item.id}-${item.color}-${item.size}`;
  const existing = cart.find(i => i.key === key);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, key, qty: 1 });
  saveCart(); syncCartUI(); openCart();
}

function changeQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.key !== key);
  saveCart(); syncCartUI();
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart(); syncCartUI();
}

function clearCart() { cart = []; saveCart(); syncCartUI(); }

/* Re-render everything that shows the cart (badge, drawer, cart page, checkout) */
function syncCartUI() {
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = cartQty();
    el.style.display = cartQty() === 0 ? "none" : "flex";
  });
  renderCartDrawer();
  if (typeof renderCartPage === "function" && document.getElementById("cartPageItems")) renderCartPage();
  if (typeof renderCheckoutSummary === "function" && document.getElementById("checkoutItems")) renderCheckoutSummary();
}

/* Quick order straight from the drawer / cart page */
function checkoutWhatsApp() {
  if (!cart.length) return;
  let msg = "Hi, I'd like to place an order:\n\n";
  cart.forEach((item, i) => {
    msg += `*${i + 1}. ${item.name}*\n`;
    msg += `Colour: ${item.color} | Size: ${item.size}\n`;
    msg += `Qty: ${item.qty} × ${money(item.price)} = ${money(item.price * item.qty)}\n\n`;
  });
  msg += `*TOTAL: ${money(cartTotal())}*\n\nName: \nDelivery location: \nPreferred payment: M-Pesa`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}
