const router = require("express").Router();
const { z } = require("zod");
const prisma = require("../config/prisma");
const { authenticate, authorize } = require("../middleware/auth");
const { generateComplaintId } = require("../utils/complaintId");
const { analyzeComplaintText } = require("../services/aiService");

const createSchema = z.object({
  category: z.enum(["WATER","ROAD_DAMAGE","STREETLIGHT","GARBAGE","DRAINAGE","OTHER"]).optional(),
  description: z.string().trim().min(10).max(5000),
  village: z.string().trim().min(2).max(100),
  location: z.string().trim().min(2).max(150),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  imageUrl: z.string().url().optional()
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const data = createSchema.parse(req.body);
    const ai = analyzeComplaintText(data.description, data.category);
    const duplicate = await prisma.complaint.findFirst({
      where: {
        village: { equals: data.village, mode: "insensitive" },
        location: { equals: data.location, mode: "insensitive" },
        category: ai.category,
        status: { not: "RESOLVED" }
      },
      select: { complaintId: true }
    });

    const complaint = await prisma.complaint.create({
      data: {
        complaintId: generateComplaintId(),
        citizenId: req.user.id,
        category: ai.category,
        description: data.description,
        village: data.village,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        priority: ai.priority,
        sentiment: ai.sentiment,
        imageUrl: data.imageUrl,
        history: { create: { status: "OPEN", note: "Complaint submitted", updatedById: req.user.id } }
      },
      include: { department: true, history: true }
    });

    res.status(201).json({
      message: "Complaint created successfully",
      duplicateWarning: duplicate ? `Possible duplicate complaint: ${duplicate.complaintId}` : null,
      ai,
      complaint
    });
  } catch (error) { next(error); }
});

router.get("/my", authenticate, async (req, res, next) => {
  try {
    const complaints = await prisma.complaint.findMany({
      where: { citizenId: req.user.id },
      include: { department: true },
      orderBy: { createdAt: "desc" }
    });
    res.json({ complaints });
  } catch (error) { next(error); }
});

router.get("/:complaintId", async (req, res, next) => {
  try {
    const complaint = await prisma.complaint.findUnique({
      where: { complaintId: req.params.complaintId.toUpperCase() },
      include: {
        department: true,
        history: { orderBy: { createdAt: "asc" }, include: { updatedBy: { select: { name: true, role: true } } } }
      }
    });
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.json({ complaint });
  } catch (error) { next(error); }
});

router.get("/", authenticate, authorize("ADMIN","SUPER_ADMIN","DEPARTMENT_OFFICER"), async (req, res, next) => {
  try {
    const { status, category, village, page = "1", limit = "20" } = req.query;
    const where = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (village) where.village = { contains: village, mode: "insensitive" };
    const take = Math.min(Math.max(Number(limit), 1), 100);
    const skip = (Math.max(Number(page), 1) - 1) * take;

    const [complaints, total] = await Promise.all([
      prisma.complaint.findMany({
        where, skip, take, orderBy: { createdAt: "desc" },
        include: { citizen: { select: { name: true, mobile: true } }, department: true }
      }),
      prisma.complaint.count({ where })
    ]);
    res.json({ total, page: Number(page), limit: take, complaints });
  } catch (error) { next(error); }
});

router.patch("/:id/status", authenticate, authorize("ADMIN","SUPER_ADMIN","DEPARTMENT_OFFICER"), async (req, res, next) => {
  try {
    const data = z.object({
      status: z.enum(["OPEN","IN_PROGRESS","RESOLVED"]),
      note: z.string().trim().max(500).optional()
    }).parse(req.body);

    const complaint = await prisma.complaint.update({
      where: { id: req.params.id },
      data: {
        status: data.status,
        resolvedAt: data.status === "RESOLVED" ? new Date() : null,
        history: { create: { status: data.status, note: data.note || "Status updated", updatedById: req.user.id } }
      },
      include: { history: { orderBy: { createdAt: "desc" }, take: 1 } }
    });
    res.json({ message: "Status updated", complaint });
  } catch (error) { next(error); }
});

router.patch("/:id/assign", authenticate, authorize("ADMIN","SUPER_ADMIN"), async (req, res, next) => {
  try {
    const data = z.object({ departmentId: z.string().min(1) }).parse(req.body);
    const department = await prisma.department.findUnique({ where: { id: data.departmentId } });
    if (!department) return res.status(404).json({ message: "Department not found" });

    const complaint = await prisma.complaint.update({
      where: { id: req.params.id },
      data: {
        departmentId: data.departmentId,
        history: { create: { status: "IN_PROGRESS", note: `Assigned to ${department.name}`, updatedById: req.user.id } }
      },
      include: { department: true }
    });
    res.json({ message: "Complaint assigned", complaint });
  } catch (error) { next(error); }
});

module.exports = router;
