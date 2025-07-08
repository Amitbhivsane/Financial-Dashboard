import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: {
    type: Date,
    required: true,
    default: Date.now, // auto-assign current time
  },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Food", "Travel", "Shopping", "Bills", "Salary", "Other"],
    required: true,
  },
});

// ✅ Export as default
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
