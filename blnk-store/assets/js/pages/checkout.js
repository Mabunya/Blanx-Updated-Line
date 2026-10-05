/* CHECKOUT PAGE — pages/checkout.html (M-Pesa STK push or WhatsApp) */
let pollingTimer = null;

function renderCheckoutSummary() {
  const box = document.getElementById("checkoutItems");
  if (!cart.length) box.innerHTML = `<p class="muted-note">Your cart is empty.</p>`;
  else box.innerHTML = cart.map(item => `
    <div class="summary-item">
      <div class="summary-item-img">${item.imageUrl ? productVisual(item) : iconSvg(item.icon, item.color)}</div>
      <div class="summary-item-info">
        <div class="summary-item-name">${item.name}</div>
        <div class="summary-item-meta">${item.size} · ${swatch(item.color)} · Qty ${item.qty}</div>
      </div>
      <div class="summary-item-price">${money(item.price * item.qty)}</div>
    </div>`).join("");
  document.getElementById("checkoutSubtotal").textContent = money(cartTotal());
  document.getElementById("checkoutTotal").textContent = money(cartTotal());
}

function selectPayment(el) {
  document.querySelectorAll(".payment-option").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
  el.querySelector("input").checked = true;
}

const generateOrderId = () => `BLANX-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;

function getCustomer() {
  const v = id => document.getElementById(id).value.trim();
  return { firstName: v("firstName"), lastName: v("lastName"), phone: v("phone"),
           email: v("email"), location: v("location"), notes: v("notes") };
}

function buildWhatsAppMessage(orderId, c, payment, receipt) {
  let msg = "🛒 *NEW ORDER — BLANX*\n\n";
  if (orderId) msg += `*Order:* ${orderId}\n\n`;
  msg += "*Items:*\n";
  cart.forEach((item, i) => {
    msg += `${i + 1}. ${item.name}\n   ${item.size} | ${item.color} | Qty ${item.qty}\n   ${money(item.price * item.qty)}\n\n`;
  });
  msg += `*Subtotal:* ${money(cartTotal())}\n\n*Customer:*\n`;
  msg += `Name: ${c.firstName} ${c.lastName}\nPhone: ${c.phone}\n`;
  if (c.email) msg += `Email: ${c.email}\n`;
  msg += `Delivery: ${c.location}\n`;
  if (c.notes) msg += `Notes: ${c.notes}\n`;
  msg += `Payment: ${payment}\n`;
  if (receipt) msg += `\n✅ *M-Pesa receipt:* ${receipt}\n*Paid:* ${money(cartTotal())}\n`;
  return msg;
}

const openWhatsApp = msg => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");

function showStatus(title, text, kind) {
  const el = document.getElementById("paymentStatus");
  el.className = `payment-status ${kind || ""}`; el.style.display = "block";
  el.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
}

function startPolling(orderId, phone, customer) {
  let attempts = 0;
  const MAX = 30; // 30 × 3s = 90s
  clearInterval(pollingTimer);
  pollingTimer = setInterval(async () => {
    attempts++;
    try {
      const res = await fetch(`/api/mpesa/status?orderId=${encodeURIComponent(orderId)}`);
      const data = await res.json();

      if (data.status === "paid") {
        clearInterval(pollingTimer);
        showStatus("✅ PAYMENT RECEIVED", `M-Pesa receipt: ${data.receipt}. Sending you to WhatsApp…`, "success");
        setTimeout(() => {
          openWhatsApp(buildWhatsAppMessage(orderId, customer, "M-Pesa (paid)", data.receipt));
          clearCart();
        }, 1500);
        return;
      }
      if (data.status === "failed") {
        clearInterval(pollingTimer);
        showStatus("❌ PAYMENT FAILED", "You cancelled or the payment failed. Try again or use WhatsApp.", "error");
        return;
      }
      showStatus("⏳ WAITING FOR M-PESA", `Check your phone (${phone}) and enter your M-Pesa PIN. (${attempts}/${MAX})`);
    } catch (err) { console.warn("poll error", err); }

    if (attempts >= MAX) {
      clearInterval(pollingTimer);
      showStatus("⏱ TIMED OUT", "We didn't receive confirmation. Pay again or message us on WhatsApp.", "error");
    }
  }, 3000);
}

async function handleMpesaPayment(customer) {
  const orderId = generateOrderId();
  showStatus("⏳ INITIATING PAYMENT", "Sending M-Pesa prompt to your phone…");
  try {
    const res = await fetch("/api/mpesa/stkpush", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: customer.phone, amount: cartTotal(), orderId, customer,
        items: cart.map(i => ({ id: i.id, name: i.name, qty: i.qty, size: i.size, color: i.color, price: i.price }))
      })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      showStatus("❌ COULD NOT SEND PROMPT", data.error || "Try again, or choose Cash on Delivery.", "error");
      return;
    }
    showStatus("📲 M-PESA PROMPT SENT", `Check your phone (${customer.phone}) and enter your PIN.`);
    startPolling(orderId, customer.phone, customer);
  } catch (err) {
    console.error(err);
    showStatus("❌ NETWORK ERROR", "Could not reach the payment server. Try again.", "error");
  }
}

async function submitCheckout(e) {
  e.preventDefault();
  if (!cart.length) { alert("Your cart is empty. Add something first."); return; }

  const customer = getCustomer();
  const payment = document.querySelector('input[name="payment"]:checked').value;

  if (payment === "M-Pesa") await handleMpesaPayment(customer);
  else openWhatsApp(buildWhatsAppMessage(generateOrderId(), customer, payment, null));
}

document.addEventListener("DOMContentLoaded", renderCheckoutSummary);
