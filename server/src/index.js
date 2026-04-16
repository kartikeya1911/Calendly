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
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`\n  🚀  API running at http://localhost:${PORT}\n`);
});
