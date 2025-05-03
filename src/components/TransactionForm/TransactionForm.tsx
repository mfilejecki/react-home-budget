import React, { useState, useEffect, useRef } from "react";
import { TransactionFormData, Transaction } from "../../types/transaction";
import { getISOStringDate } from "../../utils/formatDate";

interface TransactionFormProps {
  onSubmit: (transaction: TransactionFormData) => void;
  initialData?: Transaction;
  isEditing?: boolean;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    title: "",
    amount: 0,
    category: "",
    date: getISOStringDate(),
    type: "expense",
  });

  // State for custom dropdown
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState<
    Partial<Record<keyof TransactionFormData, string>>
  >({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        amount: initialData.amount,
        category: initialData.category,
        date: initialData.date,
        type: initialData.type,
      });
    }
  }, [initialData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Clear error when field is edited
    if (errors[name as keyof TransactionFormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }

    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category });
    setIsCategoryDropdownOpen(false);

    // Clear error if it exists
    if (errors.category) {
      setErrors({
        ...errors,
        category: undefined,
      });
    }
  };

  // Toggle dropdown
  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TransactionFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (isNaN(formData.amount) || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const categories = [
    "Food",
    "Transportation",
    "Housing",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Shopping",
    "Education",
    "Personal",
    "Salary",
    "Investment",
    "Gift",
    "Other",
  ];

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Food: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      ),
      Transportation: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        </svg>
      ),
      Housing: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    };

    return (
      iconMap[category] || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      )
    );
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-6 relative">
      {/* Transaction Type Radio Group */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transaction Type
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => setFormData({ ...formData, type: "expense" })}
            className={`cursor-pointer border rounded-lg p-4 flex items-center justify-center gap-2 transition-colors ${
              formData.type === "expense"
                ? "bg-red-50 border-red-200 text-red-700"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Expense</span>
          </div>
          <div
            onClick={() => setFormData({ ...formData, type: "income" })}
            className={`cursor-pointer border rounded-lg p-4 flex items-center justify-center gap-2 transition-colors ${
              formData.type === "income"
                ? "bg-green-50 border-green-200 text-green-700"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Income</span>
          </div>
        </div>
        <input type="hidden" name="type" value={formData.type} />
      </div>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter transaction title"
          className={`form-input ${
            errors.title
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : ""
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">$</span>
          </div>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            placeholder="0.00"
            className={`form-input pl-8 ${
              errors.amount
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
        )}
      </div>

      {/* Category - Custom Dropdown */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleCategoryDropdown}
            className={`w-full border border-gray-300 rounded-lg bg-white px-4 py-2.5 text-left text-sm flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
              errors.category
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
          >
            {formData.category ? (
              <span className="flex items-center">
                <span className="mr-2 text-gray-500">
                  {getCategoryIcon(formData.category)}
                </span>
                <span>{formData.category}</span>
              </span>
            ) : (
              <span className="text-gray-400">Select a category</span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-2 text-gray-400 transition-transform duration-200 ${
                isCategoryDropdownOpen ? "transform rotate-180" : ""
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
          {/* Hidden input to store the value */}
          <input type="hidden" name="category" value={formData.category} />

          {/* Dropdown Menu with improved positioning */}
          {isCategoryDropdownOpen && (
            <div
              className="fixed z-50 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 py-1 max-h-56 overflow-auto animate-fade-in"
              style={{
                width: dropdownRef.current?.offsetWidth + "px",
                left: dropdownRef.current?.getBoundingClientRect().left + "px",
                top:
                  (dropdownRef.current?.getBoundingClientRect().bottom ?? 0) +
                  window.scrollY +
                  "px",
              }}
            >
              {categories.map((category) => (
                <div
                  key={category}
                  className={`px-4 py-2 text-sm flex items-center cursor-pointer hover:bg-blue-50 ${
                    formData.category === category
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  <span className="mr-2 text-gray-500">
                    {getCategoryIcon(category)}
                  </span>
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`form-input ${
            errors.date
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : ""
          }`}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className={`btn w-full py-3 ${
            isEditing
              ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white"
              : formData.type === "income"
              ? "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white"
              : "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white"
          }`}
        >
          {isEditing
            ? "Update Transaction"
            : `${formData.type === "income" ? "Add Income" : "Add Expense"}`}
        </button>
      </div>

      {/* Animation styles for dropdown */}
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
    </form>
  );
};

export default TransactionForm;
