import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

export async function main() {
  // Seed data can be added here for DatabaseConnection, MetricSnapshot, or Spotlight models
  // Example:
  // await prisma.spotlight.createMany({ data: [...] })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
