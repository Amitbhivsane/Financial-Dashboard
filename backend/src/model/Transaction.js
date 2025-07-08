import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Food", "Travel", "Shopping", "Bills", "Salary", "Other"],
    required: true,
  },
});

// ✅ Default export
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
