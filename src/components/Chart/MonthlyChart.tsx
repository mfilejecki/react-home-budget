import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/formatCurrency";

interface MonthlyChartProps {
  transactions: Transaction[];
}

const MonthlyChart: React.FC<MonthlyChartProps> = ({ transactions }) => {
  const monthlyData = useMemo(() => {
    const months: Record<string, { income: number; expense: number }> = {};

    transactions.forEach((transaction) => {
      // Extract year and month from the date
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const monthName =
        date.toLocaleString("default", { month: "short" }) +
        " " +
        date.getFullYear();

      // Initialize month data if it doesn't exist
      if (!months[monthYear]) {
        months[monthYear] = {
          name: monthName,
          income: 0,
          expense: 0,
        };
      }

      // Add transaction amount to the appropriate type
      if (transaction.type === "income") {
        months[monthYear].income += transaction.amount;
      } else {
        months[monthYear].expense += transaction.amount;
      }
    });

    // Convert to array and sort by date
    return Object.keys(months)
      .sort()
      .map((key) => months[key])
      .slice(-6); // Show only the last 6 months
  }, [transactions]);

  if (monthlyData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg shadow p-4">
        <p className="text-gray-500">No transaction data to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Monthly Income and Expenses
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => value.toLocaleString("pl-PL")} />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Legend />
            <Bar dataKey="income" name="Income" fill="#4caf50" />
            <Bar dataKey="expense" name="Expense" fill="#f44336" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyChart;
