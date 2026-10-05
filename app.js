// Cart state
let cart = JSON.parse(localStorage.getItem("blnk-cart") || "[]");
const WHATSAPP_NUMBER = "254104273995";

function saveCart() { localStorage.setItem("blnk-cart", JSON.stringify(cart)); }
function cartTotal() { return cart.reduce((s,i)=>s+i.price*i.qty, 0); }
function cartQty() { return cart.reduce((s,i)=>s+i.qty, 0); }

function addToCart(item) {
  const key = `${item.id}-${item.color}-${item.size}`;
  const existing = cart.find(i => i.key === key);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, key, qty: 1 });
  saveCart();
  syncCartUI();
  openCart();
}

function removeFromCart(key) { cart = cart.filter(i => i.key !== key); saveCart(); syncCartUI(); }
function changeQty(key, delta) { ... }

function syncCartUI() {
  // Update count badge
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = cartQty());
  // Update drawer if present
  renderCartDrawer();
  // Update cart page if present
  if (document.getElementById("cartPageItems")) renderCartPage();
}

function renderCartDrawer() { ... }
function openCart() { ... } / closeCart()

function checkoutWhatsApp(customer) { ... }