require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const appRoutes = require("./routes/applicationRoutes");
const errorHandler = require("./middleware/errorHandler");
const seedAdmin = require("./config/seed");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB then seed default user
connectDB().then(() => seedAdmin());

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/applications", appRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Loan Origination API is running",
    timestamp: new Date(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
