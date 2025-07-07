import express from "express";
import { addBudget, getBudgets } from "../controllers/budgetController.js";
const router = express.Router();

router.post("/", addBudget);
router.get("/", getBudgets);

export default router;
