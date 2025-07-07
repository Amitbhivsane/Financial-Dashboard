"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import TransactionForm from "../components/components/TransactionForm";
import TransactionList from "../components/components/TransactionList";
import ExpenseChart from "../components/components/ExpenseChart";
import CategoryPieChart from "../components/components/CategoryPieChart";
import BudgetForm from "../components/components/BudgetForm";
import BudgetVsActualChart from "../components/components/BudgetVsActualChart";
import DashboardSummary from "../components/components/DashboardSummary";

import { fetchTransactions } from "../lib/api";
import { groupByMonth } from "../utils/dataUtils";
import { groupByCategory } from "../utils/categoryUtils";
import { compareBudgetToActual } from "../utils/budgetUtils";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const loadTransactions = async () => {
    const { data } = await fetchTransactions();
    setTransactions(data);
  };

  const loadBudgets = async () => {
    const res = await axios.get("http://localhost:5001/api/budgets");
    setBudgets(res.data);
  };

  useEffect(() => {
    loadTransactions();
    loadBudgets();
  }, []);

  const budgetVsActual = compareBudgetToActual(budgets, transactions);

  const totalBudget = budgetVsActual.reduce(
    (sum, item) => sum + item.budget,
    0
  );
  const totalActual = budgetVsActual.reduce(
    (sum, item) => sum + item.actual,
    0
  );

  return (
    <main className="flex flex-col md:flex-row md:h-screen">
      {/* Left Sidebar */}
      <div className="w-full md:w-[35%] bg-gray-100 p-4 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <DashboardSummary
            totalBudget={totalBudget}
            totalActual={totalActual}
            recent={[...transactions]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 1)}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Set Monthly Budget</h2>
          <BudgetForm onAdded={loadBudgets} />
        </div>

        <div>
          <BudgetVsActualChart
            data={compareBudgetToActual(budgets, transactions)}
          />
        </div>
      </div>

      {/* Center Content */}
      <div className="w-full md:w-[30%] p-6 space-y-6 overflow-y-auto">
        <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
        <TransactionForm onSuccess={loadTransactions} />
        <ExpenseChart data={groupByMonth(transactions)} />
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-[35%] bg-gray-50 p-6 space-y-6 overflow-y-auto">
        <h3 className="text-lg font-medium">By Category</h3>
        <CategoryPieChart data={groupByCategory(transactions)} />
        <h2 className="text-xl font-semibold">Transactions List</h2>

        <TransactionList
          transactions={transactions}
          onDelete={loadTransactions}
        />
      </div>
    </main>
  );
}
