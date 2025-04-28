import React from 'react';
import { Transaction } from '../../types/transaction';
import { formatCurrency } from '../../utils/formatCurrency';

interface SummaryProps {
  transactions: Transaction[];
}

const Summary: React.FC<SummaryProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
        <p className="mt-2 text-lg font-semibold text-green-600">{formatCurrency(totalIncome)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
        <p className="mt-2 text-lg font-semibold text-red-600">{formatCurrency(totalExpenses)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Balance</h3>
        <p className={`mt-2 text-lg font-semibold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  );
};

export default Summary;