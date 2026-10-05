/* POST /api/mpesa/stkpush  { phone, amount, orderId, customer, items }
   Sends an M-Pesa STK push to the buyer's phone. */
import { saveOrder, updateOrder, linkCheckout } from "../_lib/store.js";
import { BASE, timestamp, normalizePhone, getAccessToken } from "../_lib/daraja.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { phone, amount, orderId, customer, items } = req.body || {};
    if (!phone || !amount || !orderId) return res.status(400).json({ error: "Missing phone, amount, or orderId" });

    const msisdn = normalizePhone(phone);
    const ts = timestamp();
    const shortcode = process.env.DARAJA_SHORTCODE;
    const password = Buffer.from(`${shortcode}${process.env.DARAJA_PASSKEY}${ts}`).toString("base64");

    saveOrder(orderId, { phone: msisdn, amount, customer, items, status: "pending" });

    const token = await getAccessToken();
    const stkRes = await fetch(`${BASE}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: ts,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(amount),
        PartyA: msisdn,
        PartyB: shortcode,
        PhoneNumber: msisdn,
        CallBackURL: process.env.DARAJA_CALLBACK_URL,
        AccountReference: orderId,
        TransactionDesc: `BLANX order ${orderId}`
      })
    });
    const stk = await stkRes.json();

    if (!stkRes.ok || stk.ResponseCode !== "0") {
      return res.status(400).json({ error: stk.errorMessage || stk.ResponseDescription || "STK push failed" });
    }

    // Remember which order this CheckoutRequestID belongs to, so the callback can find it
    linkCheckout(stk.CheckoutRequestID, orderId);
    updateOrder(orderId, { checkoutRequestId: stk.CheckoutRequestID });

    return res.status(200).json({ ok: true, orderId, checkoutRequestId: stk.CheckoutRequestID, customerMessage: stk.CustomerMessage });
  } catch (err) {
    console.error("[stkpush]", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
