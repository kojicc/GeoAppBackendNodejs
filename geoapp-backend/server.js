const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const searchHistoryRoutes = require("./routes/searchHistory");
const { prisma } = require("./config/database");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/search-history", searchHistoryRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    database: "SQLite",
    environment: process.env.NODE_ENV || "development"
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database: SQLite`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  
  // Test database connection
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    
    // Check if test user exists
    const testUser = await prisma.user.findUnique({
      where: { email: "test@example.com" }
    });
    if (testUser) {
      console.log("Test user available: test@example.com / password123");
    }
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
