import { cache, getProduct, getRecommendedProducts } from "../";

export default async function handler(req, res) {
  const sessionId = req.cookies["session_id"];
  const list = cache.get(sessionId);
  const recommendations = getRecommendedProducts(null).slice(0, 4);

  if (!list) {
    return res.json({
      items: [],
      recommendations,
    });
  }
  const itemsInSession = list.items;
  const items = itemsInSession.map((item) => ({
    ...getProduct(item.id),
    quantity: item.quantity,
  }));
  res.json({ items, recommendations });
}
