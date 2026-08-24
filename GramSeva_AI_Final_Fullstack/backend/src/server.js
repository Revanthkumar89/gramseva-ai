require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const path = require("path");
const fs = require("fs");

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing. Copy .env.example to .env and configure it.");
}

const app = express();
const origins = (process.env.CORS_ORIGIN || "").split(",").map(x => x.trim()).filter(Boolean);

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin(origin, callback) {
    if (!origin || origins.length === 0 || origins.includes(origin)) return callback(null, true);
    callback(null, true); // Allow all in production if accessed via custom domain or proxy
  }
}));
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// API Routes
app.use("/api/health", require("./routes/health.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/complaints", require("./routes/complaint.routes"));
app.use("/api/public", require("./routes/public.routes"));
app.use("/api/upload", require("./routes/upload.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

// Serve Frontend Static Files (Unified Deploy)
const frontendPath = path.resolve(__dirname, "../../frontend");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log(`GramSeva AI API running on http://localhost:${port}`));

