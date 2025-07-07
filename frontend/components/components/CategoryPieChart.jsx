"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN card

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#a3d3ff"];

// Custom label showing category + %
const renderCustomLabel = ({ percent, category }) => {
  return `${category} (${(percent * 100).toFixed(0)}%)`;
};

export default function CategoryPieChart({ data }) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Category-wise Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              outerRadius={100}
              fill="#8884d8"
              label={renderCustomLabel}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
