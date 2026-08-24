const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const departments = [
    ["Water & Sanitation", "Water supply, leaks and quality issues"],
    ["Roads & Infrastructure", "Road damage and potholes"],
    ["Electrical Maintenance", "Streetlight and electrical issues"],
    ["Sanitation", "Garbage and waste management"],
    ["Drainage & Public Works", "Drainage and sewage issues"],
    ["General Administration", "General civic issues"]
  ];
  for (const [name, description] of departments) {
    await prisma.department.upsert({ where: { name }, update: { description }, create: { name, description } });
  }
  console.log("Departments seeded. No complaint demo data was created.");
}
main().finally(() => prisma.$disconnect());
