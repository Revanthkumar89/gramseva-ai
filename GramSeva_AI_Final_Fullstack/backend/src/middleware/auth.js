const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Authentication required" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, mobile: true, role: true, village: true }
    });

    if (!user) return res.status(401).json({ message: "User no longer exists" });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission for this action" });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
