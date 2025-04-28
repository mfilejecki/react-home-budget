import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTransaction } from "../redux/transactionsSlice";
import { TransactionFormData } from "../types/transaction";
import TransactionForm from "../components/TransactionForm/TransactionForm";

const AddTransaction: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (transactionData: TransactionFormData) => {
    dispatch(addTransaction(transactionData));
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Add New Transaction
        </h1>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back
        </button>
      </div>
      <TransactionForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddTransaction;
