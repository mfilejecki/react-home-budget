import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { deleteTransaction } from "../redux/transactionsSlice";
import TransactionList from "../components/TransactionList/TransactionList";
import Filter from "../components/Filter/Filter";
import Summary from "../components/Chart/Summary";
import ExpensesChart from "../components/Chart/ExpensesChart";
import MonthlyChart from "../components/Chart/MonthlyChart";
import { getISOStringDate } from "../utils/formatDate";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: getISOStringDate(),
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Filter by search term if provided
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        transaction.title.toLowerCase().includes(searchLower) ||
        transaction.category.toLowerCase().includes(searchLower);

      // Filter by category if selected
      const matchesCategory =
        !selectedCategory || transaction.category === selectedCategory;

      // Filter by start date if provided
      const matchesStartDate =
        !dateRange.startDate || transaction.date >= dateRange.startDate;

      // Filter by end date if provided
      const matchesEndDate =
        !dateRange.endDate || transaction.date <= dateRange.endDate;

      return (
        matchesSearch && matchesCategory && matchesStartDate && matchesEndDate
      );
    });
  }, [transactions, searchTerm, selectedCategory, dateRange]);

  // Get unique categories from transactions
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      transactions.map((transaction) => transaction.category)
    );
    return Array.from(uniqueCategories);
  }, [transactions]);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Home Budget Tracker
      </h1>

      <Summary transactions={filteredTransactions} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ExpensesChart transactions={filteredTransactions} />
        <MonthlyChart transactions={transactions} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Transactions</h2>
          <button
            onClick={() => navigate("/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Transaction
          </button>
        </div>

        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="mt-4">
          <TransactionList
            transactions={filteredTransactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
