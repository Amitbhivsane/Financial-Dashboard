"use client";

import { useState } from "react";
import { createTransaction } from "../../lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TransactionForm({ onSuccess }) {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", form); // 🔍 log the payload
      const response = await createTransaction(form);
      console.log("Transaction created:", response.data);

      onSuccess();
      setForm({ amount: "", date: "", description: "", category: "" });
    } catch (error) {
      console.error("❌ Transaction creation failed:");
      if (error.response) {
        console.error("📦 Server Response:", error.response.data);
      } else if (error.request) {
        console.error("📡 No response received:", error.request);
      } else {
        console.error("⚠️ Axios error:", error.message);
      }
    }
  };

  const categories = ["Food", "Travel", "Shopping", "Bills", "Salary", "Other"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />
      {/* Category Dropdown */}
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded"
        required
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <Input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <Input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />

      <Button type="submit">Add Transaction</Button>
    </form>
  );
}
