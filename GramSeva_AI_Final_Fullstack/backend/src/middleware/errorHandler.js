function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) {
  if (err.name === "ZodError" || err.issues) {
    const issues = err.issues ? err.issues.map(i => `${i.path.join(".") || "field"}: ${i.message}`).join(", ") : err.message;
    return res.status(400).json({ message: `Validation failed: ${issues}`, issues: err.issues });
  }
  if (err.code === "P2002") {
    return res.status(409).json({ message: "A record with this value already exists" });
  }
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
}


module.exports = { notFound, errorHandler };
