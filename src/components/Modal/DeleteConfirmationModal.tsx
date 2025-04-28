import React from "react";
import Modal from "./Modal";
import { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transaction: Transaction | null;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  transaction,
}) => {
  if (!transaction) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Transaction"
      actions={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="btn btn-danger"
          >
            Delete
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>

        <p className="text-center text-gray-700">
          Are you sure you want to delete this transaction?
        </p>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="flex items-center">
            <div
              className={`w-2 h-8 rounded-full mr-3 ${
                transaction.type === "income" ? "bg-green-400" : "bg-red-400"
              }`}
            ></div>
            <div>
              <p className="font-medium">{transaction.title}</p>
              <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
                <span>{formatDate(transaction.date)}</span>
                <span>•</span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100">
                  {transaction.category}
                </span>
                <span>•</span>
                <span
                  className={`font-medium ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}{" "}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center">
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
