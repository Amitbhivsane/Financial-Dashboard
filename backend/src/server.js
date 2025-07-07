// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { connectDB } from "./lib/db.js";
// import transactionRoutes from "./routes/transactions.js";
// import budgetRoutes from "./routes/budgets.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// const PORT = process.env.PORT;

// app.use(express.json());

// app.use("/api/transactions", transactionRoutes);
// app.use("/api/budgets", budgetRoutes);

// app.listen(PORT, () => {
//   console.log("Server running on port:", +PORT);
//   connectDB();
// });

import dotenv from "dotenv";
dotenv.config(); // ✅ This must come BEFORE using process.env
dotenv.config({ path: "backend/.env" });

import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import transactionRoutes from "./routes/transactions.js";
import budgetRoutes from "./routes/budgets.js";
import path from "path";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port: ${PORT}`);
  connectDB();
});
