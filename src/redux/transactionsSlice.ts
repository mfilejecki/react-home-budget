import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  Transaction,
  TransactionState,
  TransactionFormData,
} from "../types/transaction";
import { loadTransactions, saveTransactions } from "../services/localStorage";

const initialState: TransactionState = {
  transactions: loadTransactions(),
  status: "idle",
  error: null,
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionFormData>) => {
      const newTransaction: Transaction = {
        ...action.payload,
        id: uuidv4(),
      };
      state.transactions.push(newTransaction);
      saveTransactions(state.transactions);
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
        saveTransactions(state.transactions);
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
      saveTransactions(state.transactions);
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
