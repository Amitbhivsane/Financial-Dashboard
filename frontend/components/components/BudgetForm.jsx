"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { categories } from "@/utils/categoryUtils";
import { getCurrentMonth } from "@/utils/budgetUtils";
import { createBudget } from "@/lib/api";

export default function BudgetForm({ onAdded }) {
  const [form, setForm] = useState({ category: "Food", amount: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBudget({
      ...form,
      amount: Number(form.amount),
      month: getCurrentMonth(),
    });
    onAdded();
    setForm({ category: "Food", amount: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        value={form.category}
        onValueChange={(value) => setForm({ ...form, category: value })}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Enter budget amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <Button type="submit">Set Budget</Button>
    </form>
  );
}
