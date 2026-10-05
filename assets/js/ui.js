document.body.insertAdjacentHTML("afterbegin", `
<div class="announce">GET 10% OFF — USE CODE <strong>BLNK10</strong> AT CHECKOUT</div>
<header class="site-header">
  <nav class="nav nav-left">
    <a href="#shop">HOME</a>
    <a href="#shop">SHOP</a>
    <a href="#lookbook">LOOKBOOK</a>
    <a href="#about">ABOUT</a>
    <a href="#contact">CONTACT</a>
  </nav>
  <a href="#" class="logo">BLANX</a>
  <div class="header-actions">
    <button class="icon-btn" onclick="toggleSearch()" aria-label="Search">⌕</button>
    <button class="icon-btn" onclick="openCart()" aria-label="Cart">🛒<span class="cart-count" id="cartCount">0</span></button>
  </div>
  <button class="menu-toggle" type="button" aria-label="Menu"><span></span><span></span></button>
</header>
<div class="search-overlay" id="searchOverlay">
  <button class="search-close" onclick="toggleSearch()">×</button>
  <div class="search-box">
    <input id="searchInput" placeholder="Search products..." oninput="handleSearch(this.value)">
    <div id="searchResults"></div>
  </div>
</div>
<div class="cart-overlay" id="cartOverlay" onclick="closeCart()"></div>
<aside class="cart-drawer" id="cartDrawer">
  <div class="cart-header"><h3>YOUR CART</h3><button class="cart-close" onclick="closeCart()">×</button></div>
  <div class="cart-items" id="cartItems"></div>
  <div class="cart-empty" id="cartEmpty"><p>Your cart is empty.</p><button class="btn-outline" onclick="closeCart()">CONTINUE SHOPPING</button></div>
  <div class="cart-footer" id="cartFooter" style="display:none">
    <div class="cart-row"><span>Subtotal</span><span id="cartSubtotal">KES 0</span></div>
    <div class="cart-row small">Delivery calculated at checkout</div>
    <button class="btn-checkout" onclick="checkoutWhatsApp()">CHECKOUT ON WHATSAPP</button>
    <p class="cart-note">You'll be redirected to WhatsApp with your order details.</p>
  </div>
</aside>
<div class="modal-overlay" id="modalOverlay" onclick="closeModal()">
  <div class="modal" onclick="event.stopPropagation()">
    <button class="modal-close" onclick="closeModal()">×</button>
    <div class="modal-content" id="modalContent"></div>
  </div>
</div>
<footer class="site-footer" id="contact">
  <div class="footer-inner">
    <div><span class="logo">BLANX</span><p>Clean pieces. No noise. Nairobi-made, worldwide-influenced.</p></div>
    <div><h4>SHOP</h4><a href="#capsSection">Caps</a><a href="#sneakersSection">Sneakers</a><a href="#hoodiesSection">Hoodies</a><a href="#teesSection">Tees</a><a href="#jacketsSection">Jackets</a></div>
    <div><h4>SUPPORT</h4><a href="https://wa.me/254104273995" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="#about">About</a></div>
    <div><h4>FOLLOW</h4><a href="#">Instagram</a><a href="#">TikTok</a></div>
  </div>
  <div class="footer-base">© 2026 BLANX. All rights reserved. · Made in Nairobi.</div>
</footer>`);
document.querySelector(".menu-toggle")?.addEventListener("click", () => {
  document.querySelector(".nav-left")?.classList.toggle("open");
});
window.addEventListener("scroll", () => document.querySelector(".site-header")?.classList.toggle("scrolled", scrollY > 10));
