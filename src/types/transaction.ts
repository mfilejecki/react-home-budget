export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

export type TransactionFormData = Omit<Transaction, "id">;

export interface TransactionState {
  transactions: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
