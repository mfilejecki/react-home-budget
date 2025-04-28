import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/formatCurrency";

interface MonthlyChartProps {
  transactions: Transaction[];
}

const MonthlyChart: React.FC<MonthlyChartProps> = ({ transactions }) => {
  const [monthsToShow, setMonthsToShow] = useState<number>(6);

  const monthlyData = useMemo(() => {
    const months: Record<
      string,
      { name: string; income: number; expense: number; balance: number }
    > = {};

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
          balance: 0,
        };
      }

      // Add transaction amount to the appropriate type
      if (transaction.type === "income") {
        months[monthYear].income += transaction.amount;
      } else {
        months[monthYear].expense += transaction.amount;
      }
    });

    // Calculate balance for each month
    Object.keys(months).forEach((key) => {
      months[key].balance = months[key].income - months[key].expense;
    });

    // Convert to array and sort by date
    return Object.keys(months)
      .sort()
      .map((key) => months[key])
      .slice(-monthsToShow); // Show only the last X months
  }, [transactions, monthsToShow]);

  if (monthlyData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg shadow p-4">
        <p className="text-gray-500">No transaction data to display</p>
      </div>
    );
  }

  const handleMonthsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonthsToShow(parseInt(e.target.value, 10));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          Monthly Income and Expenses
        </h3>
        <div className="flex items-center">
          <label
            htmlFor="months-to-show"
            className="mr-2 text-sm text-gray-600"
          >
            Show:
          </label>
          <select
            id="months-to-show"
            value={monthsToShow}
            onChange={handleMonthsChange}
            className="border border-gray-300 rounded-md text-sm py-1"
          >
            <option value="3">Last 3 months</option>
            <option value="6">Last 6 months</option>
            <option value="12">Last 12 months</option>
            <option value="24">Last 24 months</option>
          </select>
        </div>
      </div>
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
            <Tooltip
              formatter={(value) => formatCurrency(value as number)}
              labelFormatter={(name) => `Month: ${name}`}
            />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="income" name="Income" fill="#4caf50" />
            <Bar dataKey="expense" name="Expense" fill="#f44336" />
            <Bar dataKey="balance" name="Balance" fill="#2196f3" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyChart;
