import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUserData(token);
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (err) {
      setError('Профиль деректерін жүктеу сәтсіз аяқталды');
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Жаңа құпия сөздер сәйкес келмейді');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(passwordData)
      });

      if (response.ok) {
        setSuccess('Құпия сөз сәтті жаңартылды');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        const data = await response.json();
        setError(data.message || 'Құпия сөзді жаңарту сәтсіз аяқталды');
      }
    } catch (err) {
      setError('Құпия сөзді жаңарту кезінде қате орын алды');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/login');
  };

  // Стили для ProfilePage
  const styles = `
    .profile-page {
      min-height: 100vh;
      padding: 100px 20px;
      background-color: #f9f9f9;
    }

    .profile-container {
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    }

    .profile-container h1 {
      color: var(--primary-green);
      margin-bottom: 40px;
      text-align: center;
      font-size: 2.5rem;
    }

    .profile-section {
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 1px solid #eee;
    }

    .profile-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .profile-section h2 {
      color: var(--primary-green);
      margin-bottom: 20px;
      font-size: 1.8rem;
    }

    .profile-info {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .info-group {
      margin-bottom: 15px;
    }

    .info-group label {
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
      color: #555;
    }

    .info-group p {
      font-size: 1.1rem;
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }

    .password-form {
      max-width: 500px;
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

    .success-message {
      color: var(--primary-green);
      margin-bottom: 20px;
      padding: 10px;
      background-color: rgba(0, 127, 69, 0.1);
      border-radius: 4px;
      text-align: center;
    }

    button[type="submit"] {
      background-color: var(--primary-green);
      color: white;
      border: none;
      padding: 12px 20px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    button[type="submit"]:hover {
      background-color: #006a38;
    }

    .logout-button {
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 12px 20px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
    }

    .logout-button:hover {
      background-color: #c0392b;
    }

    .loading {
      text-align: center;
      font-size: 1.2rem;
      color: #555;
    }
  `;

  // Добавляем стили
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  if (loading) {
    return (
      <div className="profile-page fade-in">
        <div className="profile-container">
          <div className="loading">Жүктелуде...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page fade-in">
      <div className="profile-container">
        <h1 className="slide-from-top">Профиль</h1>
        
        <div className="profile-section animate-on-scroll">
          <h2>Профиль ақпараты</h2>
          <div className="profile-info">
            <div className="info-group">
              <label>Пайдаланушы аты</label>
              <p>{userData.username}</p>
            </div>
            <div className="info-group">
              <label>Электрондық пошта</label>
              <p>{userData.email}</p>
            </div>
          </div>
        </div>

        <div className="profile-section animate-on-scroll" style={{animationDelay: '0.2s'}}>
          <h2>Құпия сөзді өзгерту</h2>
          <form className="password-form" onSubmit={handlePasswordChange}>
            {error && <div className="error-message fade-in">{error}</div>}
            {success && <div className="success-message fade-in">{success}</div>}
            
            <div className="input-group">
              <label htmlFor="currentPassword">Ағымдағы құпия сөз</label>
              <input
                type="password"
                id="currentPassword"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value
                })}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="newPassword">Жаңа құпия сөз</label>
              <input
                type="password"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value
                })}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Жаңа құпия сөзді растау</label>
              <input
                type="password"
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value
                })}
                required
              />
            </div>

            <button type="submit" className="hover-scale">
              Құпия сөзді жаңарту
            </button>
          </form>
        </div>

        <div className="profile-section animate-on-scroll" style={{animationDelay: '0.4s'}}>
          <button className="logout-button hover-scale" onClick={handleLogout}>
            Шығу
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;