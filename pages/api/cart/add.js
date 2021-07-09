import { cache } from "../";

export default async function handler(req, res) {
  const sessionId = req.cookies["session_id"];
  const { productId, quantity } = req.body;
  if (!cache.has(sessionId)) {
    cache.set(sessionId, { items: [] });
  }
  const list = cache.get(sessionId);
  list.items.push({ id: productId, quantity });
  res.json({
    redirect: "/cart",
  });
}
