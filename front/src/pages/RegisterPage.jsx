import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !email || !password) {
      setError('Барлық өрістерді толтырыңыз'); // Все поля обязательны
      return;
    }

    try {
      // Замените URL на ваш реальный URL бэкенда
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Тіркелу кезінде қате орын алды'); // Ошибка при регистрации
      } else {
        setSuccess(data.message || 'Тіркелу сәтті өтті!'); // Регистрация успешна!
        // Очистка формы
        setUsername('');
        setEmail('');
        setPassword('');
        // Можно перенаправить на страницу входа через некоторое время
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Серверге қосылу мүмкін болмады'); // Не удалось подключиться к серверу
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Тіркелу</h2> {/* Регистрация */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>Пайдаланушы аты</label> {/* Имя пользователя */}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Электрондық пошта</label> {/* Email */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Құпия сөз</label> {/* Пароль */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <button type="submit" style={styles.button}>Тіркелу</button> {/* Зарегистрироваться */}
      </form>
    </div>
  );
};

// Стили можно вынести в отдельный CSS файл или оставить здесь
const styles = {
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    marginBottom: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  // button:hover : { backgroundColor: '#0056b3' }, // Стиль для наведения
  error: {
    color: 'red',
    marginTop: '1rem',
  },
  success: {
    color: 'green',
    marginTop: '1rem',
  },
};

export default RegisterPage; 