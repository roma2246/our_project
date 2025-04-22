import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !email || !password || !confirmPassword) {
      setError('Барлық өрістерді толтырыңыз');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Құпия сөздер сәйкес келмейді');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Тіркелу кезінде қате орын алды');
      }

      document.querySelector('.register-container').classList.add('fade-out');
      setTimeout(() => {
        navigate('/login');
      }, 300);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Стили для RegisterPage
  const styles = `
    .register-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
    }

    .register-container {
      display: grid;
      grid-template-columns: 1fr;
      max-width: 1000px;
      width: 100%;
      margin: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      overflow: hidden;
      border-radius: 10px;
      background-color: white;
    }

    .image-side {
      position: relative;
      min-height: 300px;
      background-image: url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2111');
      background-size: cover;
      background-position: center;
    }

    .image-side .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 127, 69, 0.8);
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 30px;
      text-align: center;
    }

    .image-side h2 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }

    .image-side p {
      font-size: 1.1rem;
      max-width: 400px;
    }

    .form-side {
      padding: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .form-side h2 {
      font-size: 2rem;
      margin-bottom: 30px;
      color: var(--primary-green);
      text-align: center;
    }

    .input-group {
      margin-bottom: 20px;
    }

    .input-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .input-group input {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border 0.3s ease;
    }

    .input-group input:focus {
      border-color: var(--primary-green);
      outline: none;
    }

    .error-message {
      color: #e74c3c;
      margin-bottom: 20px;
      padding: 10px;
      background-color: rgba(231, 76, 60, 0.1);
      border-radius: 4px;
      text-align: center;
    }

    button[type="submit"] {
      background-color: var(--primary-green);
      color: white;
      border: none;
      padding: 12px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
      margin-top: 10px;
    }

    button[type="submit"]:hover {
      background-color: #006a38;
    }

    button[type="submit"]:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .login-link {
      text-align: center;
      margin-top: 20px;
    }

    .login-link a {
      color: var(--primary-green);
      font-weight: 500;
      text-decoration: none;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    .fade-out {
      animation: fadeIn 0.3s ease reverse forwards;
    }

    @media (min-width: 768px) {
      .register-container {
        grid-template-columns: 1fr 1fr;
      }
    }
  `;

  // Добавляем стили
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  return (
    <div className="register-page fade-in">
      <div className="register-container">
        <div className="form-side slide-from-left">
          <h2>ТІРКЕЛУ</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Пайдаланушы аты</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Пайдаланушы аты"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Электрондық пошта</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Құпия сөз</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Құпия сөзді қайталаңыз</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className="error-message fade-in">{error}</div>}

            <button type="submit" disabled={loading} className="hover-scale">
              {loading ? 'Күте тұрыңыз...' : 'ТІРКЕЛУ'}
            </button>

            <p className="login-link">
              Аккаунтыңыз бар ма? <Link to="/login">Кіру</Link>
            </p>
          </form>
        </div>
        
        <div className="image-side slide-from-right" style={{animationDelay: '0.2s'}}>
          <div className="overlay">
            <h2>Қош келдіңіз</h2>
            <p>Тіркеліп, бизнесіңізді басқаруды бастаңыз</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;