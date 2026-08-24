const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5500;
const PUBLIC_DIR = __dirname;

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const server = http.createServer((req, res) => {
  let filePath = path.join(PUBLIC_DIR, req.url === "/" ? "index.html" : req.url.split("?")[0]);
  
  if (!fs.existsSync(filePath)) {
    filePath = path.join(PUBLIC_DIR, "index.html");
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
      return;
    }
    res.writeHead(200, {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*"
    });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`GramSeva AI Frontend running on http://localhost:${PORT}`);
});
