const { PrismaClient } = require("@prisma/client");

// Create a single instance of Prisma Client to be shared across the application
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
});

/**
 * Graceful shutdown for Prisma Client
 */
const gracefulShutdown = async () => {
  console.log("Disconnecting from database...");
  await prisma.$disconnect();
  process.exit(0);
};

// Handle graceful shutdown
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

module.exports = { prisma };
