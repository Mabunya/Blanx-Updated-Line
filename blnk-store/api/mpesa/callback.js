/* POST /api/mpesa/callback — Safaricom posts the payment result here. */
import { updateOrder, findOrderIdByCheckout } from "../_lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const stk = req.body?.Body?.stkCallback;
    if (!stk) return res.status(400).json({ error: "Invalid callback payload" });

    const orderId = findOrderIdByCheckout(stk.CheckoutRequestID);
    const meta = stk.CallbackMetadata?.Item || [];
    const pick = name => meta.find(i => i.Name === name)?.Value;

    if (orderId) {
      if (stk.ResultCode === 0) {
        updateOrder(orderId, { status: "paid", receipt: pick("MpesaReceiptNumber"),
                               paidAmount: pick("Amount"), paidPhone: pick("PhoneNumber"), paidAt: Date.now() });
      } else {
        updateOrder(orderId, { status: "failed", failureReason: stk.ResultDesc });
      }
    }
  } catch (err) {
    console.error("[callback]", err);
  }
  // Safaricom expects this exact shape, always
  return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
}
