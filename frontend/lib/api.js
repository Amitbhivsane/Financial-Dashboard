import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5001/api"
      : "/api",
});

// Transactions
export const fetchTransactions = () => API.get("/transactions");
export const createTransaction = (data) => API.post("/transactions", data);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);

// Budgets
export const fetchBudgets = () => API.get("/budgets");
export const createBudget = (data) => API.post("/budgets", data);
