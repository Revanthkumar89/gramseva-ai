function generateComplaintId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `GS-${new Date().getFullYear()}-${suffix}`;
}

module.exports = { generateComplaintId };
