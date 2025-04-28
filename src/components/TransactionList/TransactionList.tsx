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

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return (
      <span className="ml-1 text-blue-600">
        {sortDirection === "asc" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    );
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
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No transactions
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by adding your first transaction.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Table header with improved alignment and consistency */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
        <div className="col-span-4 sm:col-span-5">
          <button
            className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-700 focus:outline-none transition duration-150"
            onClick={() => handleSortChange("title")}
            aria-label="Sort by title"
          >
            <div className="flex items-center">
              Title
              {getSortIcon("title")}
            </div>
          </button>
        </div>

        <div className="col-span-3 sm:col-span-2 text-left">
          <button
            className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-700 focus:outline-none transition duration-150"
            onClick={() => handleSortChange("date")}
            aria-label="Sort by date"
          >
            <div className="flex items-center">
              Date
              {getSortIcon("date")}
            </div>
          </button>
        </div>

        <div className="hidden sm:block col-span-2 text-left">
          <button
            className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-700 focus:outline-none transition duration-150"
            onClick={() => handleSortChange("category")}
            aria-label="Sort by category"
          >
            <div className="flex items-center">
              Category
              {getSortIcon("category")}
            </div>
          </button>
        </div>

        <div className="col-span-5 sm:col-span-3 text-right">
          <button
            className="flex items-center justify-end ml-auto text-sm font-medium text-gray-700 hover:text-blue-700 focus:outline-none transition duration-150"
            onClick={() => handleSortChange("amount")}
            aria-label="Sort by amount"
          >
            <div className="flex items-center">
              Amount
              {getSortIcon("amount")}
            </div>
          </button>
        </div>
      </div>

      {/* Transaction list with consistent grid layout */}
      <div className="bg-white divide-y divide-gray-100">
        {sortedTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEdit={onEdit}
            onDelete={onDelete}
            sortField={sortField}
          />
        ))}
      </div>

      {/* Pagination placeholder for future enhancement */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium">{sortedTransactions.length}</span>{" "}
          transactions
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
