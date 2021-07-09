import { cache } from "../";

export default async function handler(req, res) {
  const sessionId = req.cookies["session_id"];
  cache.del(sessionId);
  res.json({
    redirect: "/",
  });
}
