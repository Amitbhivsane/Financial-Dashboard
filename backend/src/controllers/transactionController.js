import Transaction from "../model/Transaction.js";

// POST /api/transactions

export const addTransaction = async (req, res) => {
  try {
    let { amount, date, description, category } = req.body;

    // Validate required fields
    if (!amount || !description) {
      return res.status(400).json({
        error: "Amount and description are required",
      });
    }

    // If date not provided, use current time
    if (!date) {
      date = new Date();
    }

    // Validate category if present
    const allowedCategories = [
      "Food",
      "Travel",
      "Shopping",
      "Bills",
      "Salary",
      "Other",
    ];
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({
        error: `Invalid category. Allowed: ${allowedCategories.join(", ")}`,
      });
    }

    const newTx = new Transaction({ amount, date, description, category });
    await newTx.save();

    res.status(201).json(newTx);
  } catch (error) {
    console.error("❌ Error adding transaction:", error);
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

// GET /api/transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// DELETE /api/transactions/:id
export const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ success: "Deleted transaction successfully" });
  } catch (error) {
    console.error("❌ Error deleting transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
