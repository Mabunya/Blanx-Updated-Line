/* CART PAGE — pages/cart.html */
function renderCartPage() {
  const list = document.getElementById("cartPageItems");
  const layout = document.getElementById("cartLayout");
  const emptyPage = document.getElementById("cartEmptyPage");

  if (!cart.length) { layout.style.display = "none"; emptyPage.style.display = "block"; return; }
  layout.style.display = "grid"; emptyPage.style.display = "none";

  list.innerHTML = cart.map(item => `
    <div class="cart-page-row">
      <div class="cart-page-img">${item.imageUrl ? productVisual(item) : iconSvg(item.icon, item.color)}</div>
      <div class="cart-page-info">
        <div class="cart-page-name">${item.name}</div>
        <div class="cart-page-meta">${swatch(item.color)} Size: ${item.size}</div>
        <div class="cart-qty">
          <button onclick="changeQty('${item.key}', -1)">−</button><span>${item.qty}</span><button onclick="changeQty('${item.key}', 1)">+</button>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.key}')">Remove</button>
      </div>
      <div class="cart-page-right"><div class="cart-page-price">${money(item.price * item.qty)}</div></div>
    </div>`).join("");

  document.getElementById("summarySubtotal").textContent = money(cartTotal());
  document.getElementById("summaryTotal").textContent = money(cartTotal());
}

document.addEventListener("DOMContentLoaded", renderCartPage);
