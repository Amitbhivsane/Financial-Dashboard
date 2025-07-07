import Budget from "../model/Budget.js";

export const addBudget = async (req, res) => {
  const { category, amount, month } = req.body;
  const budget = new Budget({ category, amount, month });
  await budget.save();
  res.json(budget);
};

export const getBudgets = async (req, res) => {
  const budgets = await Budget.find();
  res.json(budgets);
};
