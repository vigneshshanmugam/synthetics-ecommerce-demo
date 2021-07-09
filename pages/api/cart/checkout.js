import { cache, getProduct, getRecommendedProducts } from "../";

const ORDER = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
const TRACKING = "xx-xxxxxx-xxyxxx";

const createUniqueId = (str) => {
  return str.replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default async function handler(req, res) {
  const sessionId = req.cookies["session_id"];
  const list = cache.get(sessionId);
  const recommendations = getRecommendedProducts(null).slice(0, 4);

  const order_id = createUniqueId(ORDER);
  const tracking_id = createUniqueId(TRACKING);

  console.log("list", list);

  if (!list) {
    return res.json({
      items: [],
      order_id,
      tracking_id,
      recommendations,
    });
  }
  const itemsInSession = list.items;
  const items = itemsInSession.map((item) => ({
    ...getProduct(item.id),
    quantity: item.quantity,
  }));

  cache.del(sessionId);

  res.json({
    items,
    order_id,
    tracking_id,
    recommendations,
  });
}
