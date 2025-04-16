const API_URL = 'http://localhost:5000/api/auth';

// Временная имитация базы данных
let mockUsers = [];

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Тіркелу кезінде қате шықты');
  }

  const data = await response.json();
  return data;
};

export const login = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Кіру кезінде қате шықты');
  }

  const data = await response.json();
  return data;
};

// Проверка токена
export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${API_URL}/check`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}; 