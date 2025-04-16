// Mock data store
let transactions = [
  {
    id: 1,
    user_id: 1,
    description: "Жалақы",
    amount: 500000,
    type: "income",
    category: "salary",
    transaction_date: "2024-03-15",
    created_at: "2024-03-15T10:00:00Z",
    updated_at: "2024-03-15T10:00:00Z"
  },
  {
    id: 2,
    user_id: 1,
    description: "Аренда",
    amount: -150000,
    type: "expense",
    category: "rent",
    transaction_date: "2024-03-10",
    created_at: "2024-03-10T09:00:00Z",
    updated_at: "2024-03-10T09:00:00Z"
  }
];

// Mock API functions
export const mockGetTransactions = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return transactions;
};

export const mockAddTransaction = async (transactionData) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newTransaction = {
    id: Date.now(),
    user_id: 1,
    ...transactionData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  transactions = [newTransaction, ...transactions];
  return newTransaction;
};

export const mockDeleteTransaction = async (transactionId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = transactions.findIndex(t => t.id === transactionId);
  if (index === -1) {
    throw new Error('Transaction not found');
  }
  
  transactions = transactions.filter(t => t.id !== transactionId);
  return { success: true };
}; 