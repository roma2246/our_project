import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Электрондық пошта мен құпия сөзді енгізіңіз');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Кіру кезінде қате орын алды');
      }

      // Сохраняем токен
      localStorage.setItem('token', data.token);
      // Сохраняем данные пользователя
      localStorage.setItem('user', JSON.stringify(data.user));

      document.querySelector('.login-container').classList.add('fade-out');
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 300);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Стили для LoginPage
  const styles = `
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
    }

    .login-container {
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
      background-image: url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070');
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

    .register-link {
      text-align: center;
      margin-top: 20px;
    }

    .register-link a {
      color: var(--primary-green);
      font-weight: 500;
      text-decoration: none;
    }

    .register-link a:hover {
      text-decoration: underline;
    }

    .fade-out {
      animation: fadeIn 0.3s ease reverse forwards;
    }

    @media (min-width: 768px) {
      .login-container {
        grid-template-columns: 1fr 1fr;
      }
    }
  `;

  // Добавляем стили
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  return (
    <div className="login-page fade-in">
      <div className="login-container">
        <div className="image-side slide-from-left">
          <div className="overlay">
            <h2>Қош келдіңіз</h2>
            <p>Жүйеге кіріп, бизнесіңізді басқара бастаңыз</p>
          </div>
        </div>
        
        <div className="form-side slide-from-right" style={{animationDelay: '0.2s'}}>
          <h2>КІРУ</h2>
          <form onSubmit={handleSubmit}>
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

            {error && <div className="error-message fade-in">{error}</div>}

            <button type="submit" disabled={loading} className="hover-scale">
              {loading ? 'Күте тұрыңыз...' : 'КІРУ'}
            </button>

            <p className="register-link">
              Аккаунтыңыз жоқ па? <Link to="/register">Тіркелу</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;