import dotenv from "dotenv";
dotenv.config(); // Must come before using process.env

import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import transactionRoutes from "./routes/transactions.js";
import budgetRoutes from "./routes/budgets.js";

const app = express();

// Use the port Render provides (important!)
const PORT = process.env.PORT || 5002;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port: ${PORT}`);
  connectDB();
});
