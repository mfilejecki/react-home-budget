import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editTransaction } from "../redux/transactionsSlice";
import { RootState } from "../redux/store";
import { Transaction, TransactionFormData } from "../types/transaction";
import TransactionForm from "../components/TransactionForm/TransactionForm";

const EditTransaction: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transaction = useSelector((state: RootState) =>
    state.transactions.transactions.find((t) => t.id === id)
  );

  const handleSubmit = (transactionData: TransactionFormData) => {
    if (id) {
      const updatedTransaction: Transaction = {
        ...transactionData,
        id,
      };
      dispatch(editTransaction(updatedTransaction));
      navigate("/");
    }
  };

  if (!transaction) {
    return (
      <div className="max-w-lg mx-auto py-8 text-center">
        <h2 className="text-xl font-medium text-gray-900">
          Transaction not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Transaction</h1>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back
        </button>
      </div>
      <TransactionForm
        onSubmit={handleSubmit}
        initialData={transaction}
        isEditing={true}
      />
    </div>
  );
};

export default EditTransaction;
