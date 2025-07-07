"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BudgetVsActualChart({ data }) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Budget vs Actual (This Month)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#8884d8" name="Budget" />
            <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
