import React from "react";
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

  return (
    <div className="space-y-4">
      <div className="w-full">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Search Transactions
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search by title or category..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-full sm:w-64">
          <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              From
            </label>
            <input
              type="date"
              id="start-date"
              value={dateRange.startDate}
              onChange={handleStartDateChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              To
            </label>
            <input
              type="date"
              id="end-date"
              value={dateRange.endDate}
              onChange={handleEndDateChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
