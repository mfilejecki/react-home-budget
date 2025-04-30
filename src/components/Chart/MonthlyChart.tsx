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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const monthlyData = useMemo(() => {
    const months: Record<
      string,
      { name: string; income: number; expense: number; balance: number }
    > = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const monthName =
        date.toLocaleString("default", { month: "short" }) +
        " " +
        date.getFullYear();

      if (!months[monthYear]) {
        months[monthYear] = {
          name: monthName,
          income: 0,
          expense: 0,
          balance: 0,
        };
      }

      if (transaction.type === "income") {
        months[monthYear].income += transaction.amount;
      } else {
        months[monthYear].expense += transaction.amount;
      }
    });

    Object.keys(months).forEach((key) => {
      months[key].balance = months[key].income - months[key].expense;
    });

    return Object.keys(months)
      .sort()
      .map((key) => months[key])
      .slice(-monthsToShow);
  }, [transactions, monthsToShow]);

  if (monthlyData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-gray-500">No transaction data to display</p>
      </div>
    );
  }

  const handleMonthsChange = (months: number) => {
    setMonthsToShow(months);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getDisplayText = () => {
    switch (monthsToShow) {
      case 3:
        return "Last 3 months";
      case 6:
        return "Last 6 months";
      case 12:
        return "Last 12 months";
      case 24:
        return "Last 24 months";
      default:
        return `Last ${monthsToShow} months`;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          Monthly Income and Expenses
        </h3>
        <div className="flex items-center">
          <label
            htmlFor="months-to-show"
            className="mr-2 text-sm text-gray-600 whitespace-nowrap"
          >
            Show:
          </label>
          <div className="relative">
            <button
              type="button"
              className="border border-gray-300 rounded-md text-sm py-1 px-3 bg-white flex items-center justify-between min-w-[120px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              onClick={toggleDropdown}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span>{getDisplayText()}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-2 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 animate-fade-in">
                <ul className="py-1 max-h-56 overflow-auto" role="listbox">
                  <li
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                      monthsToShow === 3 ? "bg-blue-50 text-blue-600" : ""
                    }`}
                    onClick={() => handleMonthsChange(3)}
                    role="option"
                    aria-selected={monthsToShow === 3}
                  >
                    Last 3 months
                  </li>
                  <li
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                      monthsToShow === 6 ? "bg-blue-50 text-blue-600" : ""
                    }`}
                    onClick={() => handleMonthsChange(6)}
                    role="option"
                    aria-selected={monthsToShow === 6}
                  >
                    Last 6 months
                  </li>
                  <li
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                      monthsToShow === 12 ? "bg-blue-50 text-blue-600" : ""
                    }`}
                    onClick={() => handleMonthsChange(12)}
                    role="option"
                    aria-selected={monthsToShow === 12}
                  >
                    Last 12 months
                  </li>
                  <li
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                      monthsToShow === 24 ? "bg-blue-50 text-blue-600" : ""
                    }`}
                    onClick={() => handleMonthsChange(24)}
                    role="option"
                    aria-selected={monthsToShow === 24}
                  >
                    Last 24 months
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-72 md:h-80">
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

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fadeIn 0.2s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default MonthlyChart;
