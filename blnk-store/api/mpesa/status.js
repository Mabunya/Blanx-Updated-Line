/* GET /api/mpesa/status?orderId=BLANX-...  — the checkout page polls this. */
import { getOrder } from "../_lib/store.js";

export default async function handler(req, res) {
  const { orderId } = req.query;
  if (!orderId) return res.status(400).json({ error: "orderId required" });

  const order = getOrder(orderId);
  if (!order) return res.status(404).json({ status: "not_found" });

  return res.status(200).json({ status: order.status, receipt: order.receipt || null, amount: order.amount, phone: order.phone });
}
