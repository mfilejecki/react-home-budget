import React, { useState } from "react";
import { Transaction } from "../../types/transaction";
import { formatDate } from "../../utils/formatDate";
import { formatCurrency } from "../../utils/formatCurrency";

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  sortField?: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  const { id, title, amount, category, date, type } = transaction;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine appropriate category badge color
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      Food: "bg-green-100 text-green-800",
      Transportation: "bg-blue-100 text-blue-800",
      Housing: "bg-purple-100 text-purple-800",
      Entertainment: "bg-pink-100 text-pink-800",
      Utilities: "bg-yellow-100 text-yellow-800",
      Healthcare: "bg-red-100 text-red-800",
      Shopping: "bg-indigo-100 text-indigo-800",
      Education: "bg-teal-100 text-teal-800",
      Personal: "bg-gray-100 text-gray-800",
      Salary: "bg-green-100 text-green-800",
      Investment: "bg-blue-100 text-blue-800",
      Gift: "bg-purple-100 text-purple-800",
      Other: "bg-gray-100 text-gray-800",
    };

    return colorMap[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div
      className={`transition-all duration-200 ${
        isExpanded ? "bg-gray-50" : isHovered ? "bg-gray-50" : "bg-white"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Non-expanded view with improved alignment matching the table headers */}
      <div
        onClick={toggleExpand}
        className="grid grid-cols-12 gap-4 p-4 items-center cursor-pointer"
      >
        {/* Title column */}
        <div className="col-span-4 sm:col-span-5 min-w-0">
          <div className="flex items-center">
            <div
              className={`w-2 h-8 rounded-full mr-3 ${
                type === "income" ? "bg-green-400" : "bg-red-400"
              }`}
            ></div>
            <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
              {title}
            </h3>
          </div>
        </div>

        {/* Date column */}
        <div className="col-span-3 sm:col-span-2 text-left">
          <span className="text-xs sm:text-sm text-gray-500">
            {formatDate(date)}
          </span>
        </div>

        {/* Category column */}
        <div className="hidden sm:flex col-span-2 items-center">
          <span
            className={`px-2 py-0.5 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getCategoryColor(
              category
            )}`}
          >
            {category}
          </span>
        </div>

        {/* Amount column */}
        <div className="col-span-5 sm:col-span-3 flex items-center justify-end">
          <span
            className={`text-sm sm:text-base font-medium ${
              type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {type === "income" ? "+" : "-"} {formatCurrency(amount)}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-2 text-gray-400 transition-transform duration-200 ${
              isExpanded ? "transform rotate-180" : ""
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
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-24 text-xs font-medium text-gray-500">
                  Type:
                </span>
                <span
                  className={`text-sm px-2 py-0.5 rounded-full ${
                    type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-xs font-medium text-gray-500">
                  Date:
                </span>
                <span className="text-sm text-gray-700">
                  {formatDate(date)}
                </span>
              </div>
              <div className="flex items-center sm:hidden">
                <span className="w-24 text-xs font-medium text-gray-500">
                  Category:
                </span>
                <span
                  className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(
                    category
                  )}`}
                >
                  {category}
                </span>
              </div>
            </div>
            <div className="flex justify-start sm:justify-end gap-2">
              {/* Redesigned Edit button with better alignment */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(id);
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit
              </button>

              {/* Redesigned Delete button with better alignment */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Replace style jsx with regular style tag */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              max-height: 0;
            }
            to {
              opacity: 1;
              max-height: 500px;
            }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default TransactionItem;
