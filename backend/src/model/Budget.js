import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Food", "Bills", "Travel", "Shopping", "Other"],
    required: true,
  },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // e.g., "Jul-2025"
});

export default mongoose.model("Budget", BudgetSchema);
