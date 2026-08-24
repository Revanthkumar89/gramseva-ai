const router = require("express").Router();
const prisma = require("../config/prisma");
const { authenticate, authorize } = require("../middleware/auth");

router.use(authenticate, authorize("ADMIN","SUPER_ADMIN","DEPARTMENT_OFFICER"));

router.get("/analytics", async (req, res, next) => {
  try {
    const [total, open, inProgress, resolved, categories, villages, resolvedRecords] = await Promise.all([
      prisma.complaint.count(),
      prisma.complaint.count({ where: { status: "OPEN" } }),
      prisma.complaint.count({ where: { status: "IN_PROGRESS" } }),
      prisma.complaint.count({ where: { status: "RESOLVED" } }),
      prisma.complaint.groupBy({ by: ["category"], _count: { category: true }, orderBy: { _count: { category: "desc" } } }),
      prisma.complaint.groupBy({ by: ["village"], _count: { village: true }, orderBy: { _count: { village: "desc" } }, take: 10 }),
      prisma.complaint.findMany({ where: { status: "RESOLVED", resolvedAt: { not: null } }, select: { createdAt: true, resolvedAt: true } })
    ]);

    let avgResolutionHours = null;
    if (resolvedRecords.length) {
      avgResolutionHours = resolvedRecords.reduce((sum, c) =>
        sum + ((new Date(c.resolvedAt) - new Date(c.createdAt)) / 3600000), 0
      ) / resolvedRecords.length;
      avgResolutionHours = Number(avgResolutionHours.toFixed(2));
    }

    res.json({
      totalComplaints: total,
      openIssues: open,
      inProgressIssues: inProgress,
      resolvedIssues: resolved,
      resolutionRate: total ? Number(((resolved / total) * 100).toFixed(2)) : 0,
      averageResolutionHours: avgResolutionHours,
      mostCommonProblem: categories[0] ? { category: categories[0].category, count: categories[0]._count.category } : null,
      categoryBreakdown: categories.map(x => ({ category: x.category, count: x._count.category })),
      villageBreakdown: villages.map(x => ({ village: x.village, count: x._count.village }))
    });
  } catch (error) { next(error); }
});

router.get("/departments", async (req, res, next) => {
  try {
    const departments = await prisma.department.findMany({ orderBy: { name: "asc" } });
    res.json({ departments });
  } catch (error) { next(error); }
});

module.exports = router;
