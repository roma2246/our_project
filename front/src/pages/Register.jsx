import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Құпия сөздер сәйкес келмейді');
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await register(registerData);
      
      // Сохраняем токен
      localStorage.setItem('token', response.token);
      
      // Сохраняем данные пользователя
      const userData = {
        ...response.user,
        createdAt: response.user.createdAt || new Date().toISOString(),
        role: response.user.role || 'Пайдаланушы',
        email: registerData.email
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Тіркелу</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Пайдаланушы аты</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Құпия сөз</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Құпия сөзді қайталаңыз</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Тіркелу</button>
        </form>
        <p style={styles.loginLink}>
          Аккаунтыңыз бар ма? <Link to="/login" style={styles.link}>Кіру</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 100px)',
    backgroundColor: '#fdf6e3',
    padding: '2rem',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    color: '#657b83',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    color: '#586e75',
    fontSize: '0.9rem',
  },
  input: {
    padding: '0.8rem',
    border: '1px solid #eee8d5',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#268bd2',
    color: 'white',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#586e75',
  },
  link: {
    color: '#268bd2',
    textDecoration: 'none',
  },
  error: {
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: '1rem',
  },
};

export default Register;
