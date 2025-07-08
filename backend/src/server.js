import dotenv from "dotenv";
dotenv.config(); // Load .env variables early

import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import transactionRoutes from "./routes/transactions.js";
import budgetRoutes from "./routes/budgets.js";

const app = express();

// Load from environment or fallback
const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || "0.0.0.0"; // Bind to all interfaces (safe for Render/Docker)

// ✅ Allow both local and deployed frontend origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://financial-dashboard-frontend.onrender.com", // ✅ Replace with your deployed frontend
];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman and internal requests (no origin)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}`);
  connectDB();
});
