"use client";

import { deleteTransaction } from "../../lib/api";
import { Button } from "@/components/ui/button";

export default function TransactionList({ transactions, onDelete }) {
  const handleDelete = async (id) => {
    await deleteTransaction(id);
    onDelete();
  };

  return (
    // ✅ Scrollable container
    <div className="max-h-96 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {transactions.map((tx) => (
        <div
          key={tx._id}
          className="flex justify-between items-center p-2 border rounded"
        >
          <div>
            <div className="font-medium">{tx.description}</div>
            <div className="text-sm text-gray-500">
              {new Date(tx.date).toDateString()}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-green-600">₹{tx.amount}</span>
            <Button variant="outline" onClick={() => handleDelete(tx._id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
