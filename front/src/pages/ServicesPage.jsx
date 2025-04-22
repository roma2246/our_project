import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TransactionModal from '../components/TransactionModal';
import ProfitChart from '../components/ProfitChart';
import { getTransactions } from '../services/financeService';
import '../styles/ServicesPage.css';

const ServicesPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' или 'chart'

  useEffect(() => {
    // Загружаем данные пользователя
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions();
      console.log('Loaded transactions:', data); // Отладочный вывод
      setTransactions(data || []); // Убедимся, что всегда есть массив
    } catch (err) {
      console.error('Error loading transactions:', err); // Отладочный вывод
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('kk-KZ', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAddIncome = () => {
    setModalType('income');
    setIsModalOpen(true);
  };

  const handleAddExpense = () => {
    setModalType('expense');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleTransactionAdded = () => {
    loadTransactions();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Группировка транзакций по месяцам для обзора
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.transaction_date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const monthName = date.toLocaleString('kk-KZ', { year: 'numeric', month: 'long' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        name: monthName,
        income: 0,
        expenses: 0,
        net: 0
      };
    }

    const amount = Number(transaction.amount);
    if (amount > 0) {
      acc[monthKey].income += amount;
    } else {
      acc[monthKey].expenses += Math.abs(amount);
    }
    acc[monthKey].net += amount;

    return acc;
  }, {});

  const months = Object.values(monthlyData).sort((a, b) => {
    return new Date(b.name) - new Date(a.name);
  });

  if (loading) {
    return <div className="loading">Жүктелуде...</div>;
  }

  console.log('Current tab:', activeTab); // Отладочный вывод
  console.log('Has transactions:', transactions.length); // Отладочный вывод

  return (
    <div className="services-container">
      <div className="services-header">
        <div className="header-icon">⚡</div>
        <h1>Қаржы есептеуіш</h1>
      </div>

      <div className="welcome-card">
        <span className="welcome-icon">⚡</span>
        <p>
          {userData ? (
            `Қош келдіңіз, ${userData.username}! Бұл сіздің қаржылық есептеуішіңіз. Мұнда сіз кірістеріңіз бен шығыстарыңызды бақылай аласыз.`
          ) : (
            'Қаржылық есептеуішке қош келдіңіз! Жүйеге кіріп, өз қаржыңызды бақылаңыз.'
          )}
        </p>
        {userData ? (
          <Link to="#" className="start-button">→ Бастау</Link>
        ) : (
          <Link to="/login" className="start-button">→ Кіру</Link>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-section">
        <h2>Басқару тақтасы</h2>
        
        <div className="quick-actions">
          <h3>Жылдам әрекеттер</h3>
          <div className="action-buttons">
            <button className="action-button" onClick={handleAddIncome}>→ Кіріс қосу</button>
            <button className="action-button" onClick={handleAddExpense}>→ Шығыс қосу</button>
          </div>
        </div>

        <div className="overview-section">
          <div className="overview-header">
            <button 
              className={`overview-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => handleTabChange('overview')}
            >
              📊 Шолу
            </button>
            <button 
              className={`overview-tab ${activeTab === 'chart' ? 'active' : ''}`}
              onClick={() => handleTabChange('chart')}
            >
              📈 Пайда графигі
            </button>
          </div>

          {activeTab === 'overview' ? (
            <div className="months-grid">
              {months.map((month, index) => (
                <div key={index} className="month-card">
                  <div className="month-header">
                    <span className="month-icon">⚡</span>
                    <h4>{month.name}</h4>
                  </div>
                  <div className="month-details">
                    <div className="detail-row">
                      <span>Жалпы кіріс</span>
                      <span className="amount">{formatCurrency(month.income)}</span>
                    </div>
                    <div className="detail-row">
                      <span>Жалпы шығыс</span>
                      <span className="amount">{formatCurrency(month.expenses)}</span>
                    </div>
                    <div className="detail-row net-profit">
                      <span>Таза пайда</span>
                      <span className="amount">{formatCurrency(month.net)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="chart-view">
              <ProfitChart transactions={transactions} />
            </div>
          )}
        </div>
      </div>

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        type={modalType}
        onTransactionAdded={handleTransactionAdded}
      />
    </div>
  );
};

export default ServicesPage; 