import React, { useState } from "react";
import { Transaction } from "../../types/transaction";
import TransactionItem from "../TransactionItem/TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

type SortField = "date" | "amount" | "category" | "title";
type SortDirection = "asc" | "desc";

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    const directionModifier = sortDirection === "asc" ? 1 : -1;

    switch (sortField) {
      case "date":
        return (
          directionModifier *
          (new Date(a.date).getTime() - new Date(b.date).getTime())
        );
      case "amount":
        return directionModifier * (a.amount - b.amount);
      case "category":
        return directionModifier * a.category.localeCompare(b.category);
      case "title":
        return directionModifier * a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  if (transactions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-700">
        <button
          className="flex items-center hover:text-blue-700 focus:outline-none"
          onClick={() => handleSortChange("title")}
        >
          Title
          {sortField === "title" && (
            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
          )}
        </button>
        <button
          className="flex items-center hover:text-blue-700 focus:outline-none"
          onClick={() => handleSortChange("date")}
        >
          Date
          {sortField === "date" && (
            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
          )}
        </button>
        <button
          className="hidden sm:flex items-center hover:text-blue-700 focus:outline-none"
          onClick={() => handleSortChange("category")}
        >
          Category
          {sortField === "category" && (
            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
          )}
        </button>
        <button
          className="flex items-center justify-end hover:text-blue-700 focus:outline-none"
          onClick={() => handleSortChange("amount")}
        >
          Amount
          {sortField === "amount" && (
            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
          )}
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {sortedTransactions.map((transaction) => (
          <li key={transaction.id}>
            <TransactionItem
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
