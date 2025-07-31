const express = require("express");
const { prisma } = require("../config/database");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * GET /api/search-history
 * Get user's search history
 */
router.get("/", authenticateToken, async (req, res) => {
  try {
    // Get user's search history from database
    const searchHistory = await prisma.searchHistory.findMany({
      where: { userId: req.user.id },
      orderBy: { searchedAt: "desc" }, // Most recent first
      take: 50, // Limit to last 50 searches
    });

    res.json(searchHistory);
  } catch (error) {
    console.error("Get search history error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/search-history
 * Save new search to history
 */
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { ipAddress, city, region, country, location, timezone, org } = req.body;

    if (!ipAddress) {
      return res.status(400).json({ message: "IP address is required" });
    }

    // Check if this IP search already exists for this user
    const existingSearch = await prisma.searchHistory.findFirst({
      where: {
        userId: req.user.id,
        ipAddress: ipAddress,
      },
    });

    // If it exists, update the timestamp; otherwise create new record
    let searchHistory;
    if (existingSearch) {
      searchHistory = await prisma.searchHistory.update({
        where: { id: existingSearch.id },
        data: {
          city,
          region,
          country,
          location,
          timezone,
          org,
          searchedAt: new Date(),
        },
      });
    } else {
      searchHistory = await prisma.searchHistory.create({
        data: {
          userId: req.user.id,
          ipAddress,
          city,
          region,
          country,
          location,
          timezone,
          org,
        },
      });
    }

    res.status(201).json(searchHistory);
  } catch (error) {
    console.error("Save search history error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/search-history
 * Delete selected search histories
 */
router.delete("/", authenticateToken, async (req, res) => {
  try {
    const { ipAddresses } = req.body; // Array of IP addresses to delete

    if (!ipAddresses || !Array.isArray(ipAddresses)) {
      return res.status(400).json({ message: "IP addresses array required" });
    }

    // Delete specified search histories for this user
    const deleteResult = await prisma.searchHistory.deleteMany({
      where: {
        userId: req.user.id,
        ipAddress: { in: ipAddresses },
      },
    });

    res.json({ 
      message: `${deleteResult.count} search histories deleted`,
      deletedCount: deleteResult.count 
    });
  } catch (error) {
    console.error("Delete search history error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/search-history/all
 * Clear all search history for user
 */
router.delete("/all", authenticateToken, async (req, res) => {
  try {
    const deleteResult = await prisma.searchHistory.deleteMany({
      where: {
        userId: req.user.id,
      },
    });

    res.json({ 
      message: `All search history cleared (${deleteResult.count} records)`,
      deletedCount: deleteResult.count 
    });
  } catch (error) {
    console.error("Clear all search history error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
