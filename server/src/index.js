require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");

// Route modules
const eventTypeRoutes = require("./routes/eventTypes");
const availabilityRoutes = require("./routes/availability");
const meetingRoutes = require("./routes/meetings");
const publicRoutes = require("./routes/public");
const authRoutes = require("./routes/auth");

const app = express();

// --------------- Middleware ---------------
app.use(cors());
app.use(express.json());

// --------------- Health Check ---------------
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// --------------- API Routes ---------------
app.use("/api/event-types", eventTypeRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/public", publicRoutes);
app.use("/api", authRoutes);

// --------------- Error Handler ---------------
app.use(errorHandler);

// --------------- Start Server ---------------
const { prisma } = require("./config/database");
const { DEFAULT_USER_ID } = require("./config/constants");

// --------------- Start Server ---------------
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    // Ensure the default user exists to prevent foreign key constraint errors 
    // when creating event types or booking meetings on a fresh database.
    await prisma.user.upsert({
      where: { id: DEFAULT_USER_ID },
      update: {},
      create: {
        id: DEFAULT_USER_ID,
        name: "Rahul Jain",
        email: "owner@calendlyclone.dev",
        timezone: "Asia/Kolkata",
      },
    });
    console.log("  ✓ Default user verified");
  } catch (error) {
    console.error("  ❌ Failed to verify default user:", error.message);
  }

  app.listen(PORT, () => {
    console.log(`\n  🚀  API running at http://localhost:${PORT}\n`);
  });
}

bootstrap();
