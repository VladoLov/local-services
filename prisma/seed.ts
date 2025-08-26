import { PrismaClient } from "../lib/prisma/edge";

const prisma = new PrismaClient();

async function main() {
  const services = [
    {
      name: "Joe's Plumbing",
      category: "Plumbing",
      address: "123 Main St, Sarajevo",
      phone: "+38761123456",
      email: "joe@example.com",
      rating: 4.5,
    },
    {
      name: "Anna's Bakery",
      category: "Food",
      address: "456 Bakery Rd, Zagreb",
      phone: "+385911234567",
      email: "anna@example.com",
      rating: 4.8,
    },
    // Add 10–15 more services
  ];

  await prisma.service.createMany({
    data: services,
    skipDuplicates: true, // avoids duplicates if re-run
  });

  console.log("✅ Seeded services successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
