import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/formatCurrency";

interface ExpensesChartProps {
  transactions: Transaction[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#F06292",
  "#26A69A",
  "#5C6BC0",
  "#FFA726",
  "#EF5350",
  "#66BB6A",
  "#42A5F5",
  "#AB47BC",
  "#EC407A",
];

const ExpensesChart: React.FC<ExpensesChartProps> = ({ transactions }) => {
  const expensesByCategory = useMemo(() => {
    // Filter only expense transactions
    const expenses = transactions.filter((t) => t.type === "expense");

    // Group by category and sum amounts
    const categoryMap = new Map<string, number>();
    expenses.forEach((expense) => {
      const currentAmount = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, currentAmount + expense.amount);
    });

    // Convert to array for chart data and sort by amount (highest first)
    return Array.from(categoryMap.entries())
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  if (expensesByCategory.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg shadow p-4">
        <p className="text-gray-500">No expense data to display</p>
      </div>
    );
  }

  const renderCustomizedLabel = ({
    name,
    percent,
  }: {
    name: string;
    percent: number;
  }) => {
    return percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : "";
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          Expenses by Category
        </h3>
        <div className="text-sm text-gray-500">
          Total:{" "}
          <span className="font-medium text-red-600">
            {formatCurrency(totalExpenses)}
          </span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expensesByCategory}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={renderCustomizedLabel}
            >
              {expensesByCategory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrency(value as number)}
              labelFormatter={(name) => `Category: ${name}`}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              formatter={(value, entry, index) => {
                const item = expensesByCategory[index];
                return `${value}: ${formatCurrency(item.value)}`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensesChart;
