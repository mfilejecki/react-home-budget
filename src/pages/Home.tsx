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
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
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
  const [activeTab, setActiveTab] = useState<"transactions" | "charts">(
    "transactions"
  );

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null
  );
  const [transactionDetails, setTransactionDetails] = useState<any>(null);

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
    return Array.from(uniqueCategories).sort();
  }, [transactions]);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    // Find the transaction details to show in the modal
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) {
      setTransactionDetails(transaction);
      setTransactionToDelete(id);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      dispatch(deleteTransaction(transactionToDelete));
      setTransactionToDelete(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Track and manage your financial transactions
        </p>
      </div>

      <Summary transactions={filteredTransactions} />

      {/* Tab Navigation */}
      <div className="mb-6 bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "transactions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("transactions")}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Transactions
              </div>
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "charts"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("charts")}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                Charts & Analytics
              </div>
            </button>
          </nav>
        </div>

        {activeTab === "transactions" && (
          <>
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <Filter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>

            <TransactionList
              transactions={filteredTransactions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}

        {activeTab === "charts" && (
          <div className="p-6 bg-white">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Analytics
              </h3>
              <p className="text-sm text-gray-500">
                Visual representation of your financial data
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-lg overflow-hidden">
                <ExpensesChart transactions={filteredTransactions} />
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-lg overflow-hidden">
                <MonthlyChart transactions={transactions} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        transaction={transactionDetails}
      />
    </div>
  );
};

export default Home;
