/* In-memory order store — fine for sandbox testing, resets on cold start and
   isn't shared between serverless instances. Before going live, swap the
   bodies below for Vercel KV (see README). Keep the same function names. */
const orders = new Map();
const byCheckout = new Map();

export const saveOrder = (id, data) => orders.set(id, { ...data, id, createdAt: Date.now() });
export const getOrder = id => orders.get(id);
export const updateOrder = (id, patch) => {
  const o = orders.get(id);
  if (o) orders.set(id, { ...o, ...patch, updatedAt: Date.now() });
};
export const linkCheckout = (checkoutRequestId, orderId) => byCheckout.set(checkoutRequestId, orderId);
export const findOrderIdByCheckout = checkoutRequestId => byCheckout.get(checkoutRequestId);
