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
type PageSize = 5 | 10 | 20 | 50;

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(10);
  const [isPageSizeDropdownOpen, setIsPageSizeDropdownOpen] = useState(false);

  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
    // Reset to first page when sorting changes
    setCurrentPage(1);
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
              d="M5.293 12.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 01-1.414 0z"
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

  // Pagination logic
  const totalPages = Math.ceil(sortedTransactions.length / pageSize);
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const togglePageSizeDropdown = () => {
    setIsPageSizeDropdownOpen(!isPageSizeDropdownOpen);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPageButtons = 5; // Max number of page buttons to show

    if (totalPages <= maxPageButtons) {
      // If we have fewer pages than our max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      // Calculate start and end of the middle section
      let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 2);
      let endPage = Math.min(startPage + maxPageButtons - 3, totalPages - 1);

      // Adjust if we're near the end
      if (endPage === totalPages - 1) {
        startPage = Math.max(endPage - (maxPageButtons - 3), 2);
      }

      // Add ellipsis if there's a gap after the first page
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if there's a gap before the last page
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      // Always include last page if we have more than one page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

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
    <div className="overflow-hidden rounded-lg shadow bg-gray-50">
      {/* Table header with improved alignment and consistency */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
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
        {paginatedTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEdit={onEdit}
            onDelete={onDelete}
            sortField={sortField}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200">
        <div className="flex items-center p-4">
          <span className="text-sm text-gray-700 mr-2">
            Showing
            <span className="font-medium mx-1">
              {Math.min(
                (currentPage - 1) * pageSize + 1,
                sortedTransactions.length
              )}
            </span>
            to
            <span className="font-medium mx-1">
              {Math.min(currentPage * pageSize, sortedTransactions.length)}
            </span>
            of
            <span className="font-medium mx-1">
              {sortedTransactions.length}
            </span>
            entries
          </span>

          <div className="ml-2 relative">
            <label htmlFor="pageSize" className="sr-only">
              Items per page
            </label>
            <div className="relative">
              <button
                onClick={togglePageSizeDropdown}
                className="border border-gray-300 rounded-md text-sm py-1 pl-3 pr-8 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between min-w-[110px]"
                aria-haspopup="listbox"
                aria-expanded={isPageSizeDropdownOpen}
              >
                <span>{pageSize} per page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-2 text-gray-400 absolute right-2 transition-transform duration-200 ${
                    isPageSizeDropdownOpen ? "transform rotate-180" : ""
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
              {isPageSizeDropdownOpen && (
                <div className="absolute right-0 bottom-full mb-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 animate-fade-in">
                  <ul className="py-1 max-h-56 overflow-auto" role="listbox">
                    {[5, 10, 20, 50].map((size) => (
                      <li
                        key={`pagesize-${size}`}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                          pageSize === size ? "bg-blue-50 text-blue-600" : ""
                        }`}
                        onClick={() => {
                          setPageSize(size as PageSize);
                          setCurrentPage(1);
                          setIsPageSizeDropdownOpen(false);
                        }}
                        role="option"
                        aria-selected={pageSize === size}
                      >
                        {size} per page
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center sm:justify-end p-4">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              {/* Previous Page Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => {
                if (page === "ellipsis-start" || page === "ellipsis-end") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={`page-${page}`}
                    onClick={() => handlePageChange(page as number)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Page Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages || totalPages === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
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

export default TransactionList;
