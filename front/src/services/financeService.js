const API_URL = 'http://localhost:5000/api';

export const getTransactions = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/finances`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return response.json();
};

export const addTransaction = async (transactionData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/finances`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(transactionData)
  });

  if (!response.ok) {
    throw new Error('Failed to add transaction');
  }

  return response.json();
};

export const deleteTransaction = async (transactionId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/finances/${transactionId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete transaction');
  }

  return response.json();
}; 