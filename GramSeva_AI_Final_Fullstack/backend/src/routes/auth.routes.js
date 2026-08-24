const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const prisma = require("../config/prisma");
const { authenticate } = require("../middleware/auth");

const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().email().optional().or(z.literal("")),
  mobile: z.string().regex(/^\d{10}$/, "Mobile must be 10 digits"),
  password: z.string().min(6).max(100),
  village: z.string().trim().max(100).optional()
});

router.post("/register", async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email || null,
        mobile: data.mobile,
        passwordHash,
        village: data.village || null
      },
      select: { id: true, name: true, email: true, mobile: true, role: true, village: true, createdAt: true }
    });
    res.status(201).json({ message: "Registration successful", user });
  } catch (error) { next(error); }
});

router.post("/login", async (req, res, next) => {
  try {
    const body = z.object({
      mobile: z.string().regex(/^\d{10}$/),
      password: z.string().min(1)
    }).parse(req.body);

    const user = await prisma.user.findUnique({ where: { mobile: body.mobile } });
    if (!user || !(await bcrypt.compare(body.password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid mobile number or password" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile, role: user.role, village: user.village }
    });
  } catch (error) { next(error); }
});

router.get("/me", authenticate, (req, res) => res.json({ user: req.user }));

module.exports = router;
