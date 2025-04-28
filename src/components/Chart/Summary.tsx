import React, { useMemo } from "react";
import { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/formatCurrency";

interface SummaryProps {
  transactions: Transaction[];
}

const Summary: React.FC<SummaryProps> = ({ transactions }) => {
  const financialData = useMemo(() => {
    // Filter transactions by type
    const incomeTransactions = transactions.filter((t) => t.type === "income");
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense"
    );

    // Calculate totals
    const totalIncome = incomeTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );
    const totalExpenses = expenseTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );
    const balance = totalIncome - totalExpenses;

    // Calculate averages
    const avgIncome = incomeTransactions.length
      ? totalIncome / incomeTransactions.length
      : 0;
    const avgExpense = expenseTransactions.length
      ? totalExpenses / expenseTransactions.length
      : 0;

    // Find highest income and expense
    const highestIncome = incomeTransactions.length
      ? Math.max(...incomeTransactions.map((t) => t.amount))
      : 0;
    const highestExpense = expenseTransactions.length
      ? Math.max(...expenseTransactions.map((t) => t.amount))
      : 0;

    return {
      totalIncome,
      totalExpenses,
      balance,
      avgIncome,
      avgExpense,
      highestIncome,
      highestExpense,
      transactionCount: transactions.length,
      savingsRate:
        totalIncome > 0
          ? ((totalIncome - totalExpenses) / totalIncome) * 100
          : 0,
    };
  }, [transactions]);

  // Calculate a percentage for visual indicator, capped at 100%
  const savingsRateForVisual = Math.min(
    Math.max(financialData.savingsRate, 0),
    100
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Income Card */}
      <div className="card p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rounded-full bg-green-100 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-green-100 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-gray-600 font-medium">Total Income</h3>
          </div>
          <p className="mt-3 text-2xl font-bold text-green-600">
            {formatCurrency(financialData.totalIncome)}
          </p>
          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <div>
              <p className="mb-1">Avg Transaction</p>
              <p className="font-semibold">
                {formatCurrency(financialData.avgIncome)}
              </p>
            </div>
            <div className="text-right">
              <p className="mb-1">Highest</p>
              <p className="font-semibold">
                {formatCurrency(financialData.highestIncome)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Card */}
      <div className="card p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rounded-full bg-red-100 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-red-100 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </div>
            <h3 className="text-gray-600 font-medium">Total Expenses</h3>
          </div>
          <p className="mt-3 text-2xl font-bold text-red-600">
            {formatCurrency(financialData.totalExpenses)}
          </p>
          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <div>
              <p className="mb-1">Avg Transaction</p>
              <p className="font-semibold">
                {formatCurrency(financialData.avgExpense)}
              </p>
            </div>
            <div className="text-right">
              <p className="mb-1">Highest</p>
              <p className="font-semibold">
                {formatCurrency(financialData.highestExpense)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="card p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rounded-full bg-blue-100 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-blue-100 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <h3 className="text-gray-600 font-medium">Balance</h3>
          </div>
          <p
            className={`mt-3 text-2xl font-bold ${
              financialData.balance >= 0 ? "text-blue-600" : "text-red-600"
            }`}
          >
            {formatCurrency(financialData.balance)}
          </p>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Savings Rate</span>
              <span
                className={`font-medium ${
                  financialData.savingsRate >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {financialData.savingsRate.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  financialData.savingsRate >= 0 ? "bg-green-500" : "bg-red-500"
                }`}
                style={{ width: `${savingsRateForVisual}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              <span>Transactions: {financialData.transactionCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
