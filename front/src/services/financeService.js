const API_URL = 'http://localhost:5000/api';

export const addTransaction = async (transactionData) => {
  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem('user')).id;

  try {
    const response = await fetch(`${API_URL}/business_finances`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...transactionData,
        user_id: userId
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Транзакцияны сақтау кезінде қате шықты');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Серверге қосылу мүмкін болмады');
  }
};

export const getTransactions = async () => {
  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem('user')).id;

  try {
    const response = await fetch(`${API_URL}/business_finances?user_id=${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Транзакцияларды жүктеу кезінде қате шықты');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Серверге қосылу мүмкін болмады');
  }
}; 