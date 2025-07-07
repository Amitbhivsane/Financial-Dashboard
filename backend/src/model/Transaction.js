import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Food", "Travel", "Shopping", "Bills", "Salary", "Other"],
    required: true,
  },
});

export default mongoose.model("Transaction", TransactionSchema);
