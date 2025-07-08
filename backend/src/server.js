import dotenv from "dotenv";
dotenv.config(); // Load .env variables early

import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import transactionRoutes from "./routes/transactions.js";
import budgetRoutes from "./routes/budgets.js";

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Allow both local and deployed frontend origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://financial-dashboard-frontend.onrender.com", // ✅ replace with real Render frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman or no origin (server-to-server)
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

// ✅ Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);

// Optional: fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port: ${PORT}`);
  connectDB();
});
