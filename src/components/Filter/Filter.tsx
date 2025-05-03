import React, { useState } from "react";
import { getISOStringDate } from "../../utils/formatDate";

interface FilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  onDateRangeChange: (dateRange: {
    startDate: string;
    endDate: string;
  }) => void;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  dateRange,
  onDateRangeChange,
  searchTerm,
  onSearchChange,
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateRangeChange({
      ...dateRange,
      startDate: e.target.value,
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateRangeChange({
      ...dateRange,
      endDate: e.target.value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
  };

  const clearAllFilters = () => {
    onCategoryChange("");
    onSearchChange("");
    onDateRangeChange({
      startDate: "",
      endDate: getISOStringDate(),
    });
  };

  // Count active filters
  const activeFilterCount = [
    selectedCategory,
    dateRange.startDate,
    searchTerm,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search bar with icon */}
        <div className="w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="form-input pl-10 py-2"
          />
        </div>

        {/* Filter toggle button */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          >
            <svg
              className="h-5 w-5 mr-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full bg-blue-500 text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {(selectedCategory || dateRange.startDate || searchTerm) && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {isFiltersExpanded && (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mt-2 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category filter */}
            <div>
              <label
                htmlFor="category-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="form-select"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date range - start date */}
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                From Date
              </label>
              <input
                type="date"
                id="start-date"
                value={dateRange.startDate}
                onChange={handleStartDateChange}
                className="form-input"
              />
            </div>

            {/* Date range - end date */}
            <div>
              <label
                htmlFor="end-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                To Date
              </label>
              <input
                type="date"
                id="end-date"
                value={dateRange.endDate}
                onChange={handleEndDateChange}
                className="form-input"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
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
      `}</style>
    </div>
  );
};

export default Filter;
