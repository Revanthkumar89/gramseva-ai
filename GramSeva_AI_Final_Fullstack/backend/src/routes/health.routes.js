const router = require("express").Router();
const prisma = require("../config/prisma");

router.get("/", async (req, res) => {
  let database = "unknown";
  try { await prisma.$queryRaw`SELECT 1`; database = "connected"; } catch (e) { database = "disconnected"; }
  res.json({ status: "ok", service: "GramSeva AI API", database, timestamp: new Date().toISOString() });
});

module.exports = router;
