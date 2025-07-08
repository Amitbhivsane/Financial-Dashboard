import axios from "axios";

const API = axios.create({
  baseURL:
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:5001/api"
      : process.env.NEXT_PUBLIC_API_URL,
});

// Transactions
export const fetchTransactions = () => API.get("/transactions");
export const createTransaction = (data) => API.post("/transactions", data);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);

// Budgets
export const fetchBudgets = () => API.get("/budgets");
export const createBudget = (data) => API.post("/budgets", data);
