// Database Seeder - Creates sample users and search history

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  const users = [
    {
      email: "john@example.com",
      password: await bcrypt.hash("password123", 10),
      name: "John Doe",
    },
    {
      email: "jane@example.com",
      password: await bcrypt.hash("secret456", 10),
      name: "Jane Smith",
    },
    {
      email: "test@example.com",
      password: await bcrypt.hash("password123", 10),
      name: "Test User",
    },
  ];

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
    console.log(`Created user: ${user.email}`);
  }

  const firstUser = await prisma.user.findFirst({
    where: { email: "john@example.com" },
  });

  if (firstUser) {
    const searchHistories = [
      {
        userId: firstUser.id,
        ipAddress: "8.8.8.8",
        city: "Mountain View",
        region: "California",
        country: "US",
        location: "37.4056,-122.0775",
        timezone: "America/Los_Angeles",
        org: "Google LLC",
      },
      {
        userId: firstUser.id,
        ipAddress: "1.1.1.1",
        city: "San Francisco",
        region: "California",
        country: "US",
        location: "37.7749,-122.4194",
        timezone: "America/Los_Angeles",
        org: "Cloudflare, Inc.",
      },
      {
        userId: firstUser.id,
        ipAddress: "208.67.222.222",
        city: "San Francisco",
        region: "California",
        country: "US",
        location: "37.7749,-122.4194",
        timezone: "America/Los_Angeles",
        org: "OpenDNS, LLC",
      },
    ];

    for (const historyData of searchHistories) {
      const history = await prisma.searchHistory.create({
        data: historyData,
      });
      console.log(`Created search history: ${history.ipAddress}`);
    }
  }

  console.log("Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
