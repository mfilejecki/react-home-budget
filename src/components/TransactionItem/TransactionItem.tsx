import React from 'react';
import { Transaction } from '../../types/transaction';
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onEdit, onDelete }) => {
  const { id, title, amount, category, date, type } = transaction;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex-1 min-w-0 mb-2 sm:mb-0">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="flex items-center mt-1">
          <span className="text-sm text-gray-500 mr-2">{formatDate(date)}</span>
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            {category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col sm:items-end">
        <span className={`text-lg font-medium ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
          {type === 'income' ? '+' : '-'} {formatCurrency(amount)}
        </span>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => onEdit(id)}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;