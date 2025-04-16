import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransactions, addTransaction, deleteTransaction } from '../services/financeService';

const MainPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('income');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для безопасного преобразования в число
  const safeParseFloat = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Функция для безопасного форматирования суммы
  const formatAmount = (amount) => {
    const num = parseFloat(amount);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      loadTransactions();
    }
  }, [navigate]);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();
      const formattedData = data.map(t => ({
        ...t,
        amount: safeParseFloat(t.amount)
      }));
      setTransactions(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError('Деректерді жүктеу кезінде қате шықты');
      setIsLoading(false);
    }
  };

  const handleAddTransaction = async () => {
    if (!description || !amount) return;

    try {
      const parsedAmount = safeParseFloat(amount);
      const newTransaction = {
        description,
        amount: category === 'income' ? parsedAmount : -parsedAmount,
        type: category,
        transaction_date: date
      };

      const savedTransaction = await addTransaction(newTransaction);
      const formattedTransaction = {
        ...savedTransaction,
        amount: safeParseFloat(savedTransaction.amount)
      };
      setTransactions([formattedTransaction, ...transactions]);
      setDescription('');
      setAmount('');
    } catch (err) {
      setError('Транзакцияны қосу кезінде қате шықты');
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (err) {
      setError('Транзакцияны жою кезінде қате шықты');
    }
  };

  const getMonthlyData = (yearMonth) => {
    const monthTransactions = transactions.filter(t => t.transaction_date.startsWith(yearMonth));
    const income = monthTransactions
      .filter(t => t.amount > 0)
      .reduce((acc, t) => acc + safeParseFloat(t.amount), 0);
    const expenses = monthTransactions
      .filter(t => t.amount < 0)
      .reduce((acc, t) => acc + safeParseFloat(t.amount), 0);
    return {
      income,
      expenses,
      netProfit: income + expenses
    };
  };

  const getLastFiveMonths = () => {
    const months = [];
    const currentDate = new Date();
    for (let i = 0; i < 5; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      months.push(date.toISOString().slice(0, 7));
    }
    return months.reverse();
  };

  if (isLoading) {
    return <div style={styles.loading}>Жүктелуде...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.welcomeCard}>
          <h1 style={styles.title}>⚡ Кәсіптік қаржы бақылаушы</h1>
          <p style={styles.subtitle}>
            Сіздің бизнесіңіздің қаржылық жағдайын бақылаңыз — кірістер, шығыстар және таза пайданы бір жерде қадағалаңыз.
          </p>
        </div>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.dashboard}>
        <h2 style={styles.sectionTitle}>Басқару тақтасы</h2>
        
        <div style={styles.quickActions}>
          <div style={styles.actionSection}>
            <h3 style={styles.subheading}>Жылдам әрекеттер</h3>
            <button style={styles.actionButton} onClick={() => setCategory('income')}>➕ Жаңа кіріс қосу</button>
            <button style={styles.actionButton} onClick={() => setCategory('expense')}>➖ Жаңа шығыс қосу</button>
          </div>

          <div style={styles.formSection}>
            <h3 style={styles.subheading}>Жаңа жазба</h3>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Сипаттама"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Сома"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.input}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={styles.input}
              >
                <option value="income">Кіріс</option>
                <option value="expense">Шығыс</option>
              </select>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleAddTransaction} style={styles.addButton}>Қосу</button>
            </div>
          </div>
        </div>

        <div style={styles.overview}>
          <h3 style={styles.subheading}>Соңғы 5 ай</h3>
          <div style={styles.monthsGrid}>
            {getLastFiveMonths().map(month => {
              const data = getMonthlyData(month);
              const monthName = new Date(month).toLocaleDateString('kk-KZ', { month: 'long', year: 'numeric' });
              return (
                <div key={month} style={styles.monthCard}>
                  <h4 style={styles.monthTitle}>{monthName}</h4>
                  <div style={styles.monthData}>
                    <p>Жалпы кіріс: <span style={styles.income}>{formatAmount(data.income)} ₸</span></p>
                    <p>Жалпы шығыс: <span style={styles.expense}>{formatAmount(Math.abs(data.expenses))} ₸</span></p>
                    <p>Таза пайда: <span style={{
                      color: data.netProfit >= 0 ? '#2ecc71' : '#e74c3c',
                      fontWeight: 'bold'
                    }}>{formatAmount(data.netProfit)} ₸</span></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.transactionsContainer}>
          <h3 style={styles.subheading}>Соңғы операциялар</h3>
          <div style={styles.transactionsList}>
            {transactions.map(t => (
              <div key={t.id} style={styles.transactionCard}>
                <div style={styles.transactionInfo}>
                  <div style={styles.transactionHeader}>
                    <span style={styles.transactionDate}>
                      {new Date(t.transaction_date).toLocaleDateString('kk-KZ')}
                    </span>
                    <span style={styles.transactionAmount(parseFloat(t.amount) || 0)}>
                      {parseFloat(t.amount) > 0 ? '+' : ''}{formatAmount(t.amount)} ₸
                    </span>
                  </div>
                  <p style={styles.transactionDescription}>{t.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteTransaction(t.id)}
                  style={styles.deleteButton}
                >
                  Жою
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  header: {
    marginBottom: '2rem',
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#2c3e50',
  },
  subtitle: {
    color: '#666',
    marginBottom: '1.5rem',
    lineHeight: '1.5',
  },
  dashboard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '2rem',
  },
  sectionTitle: {
    marginBottom: '2rem',
    color: '#2c3e50',
  },
  quickActions: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '2rem',
    marginBottom: '2rem',
  },
  actionSection: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  formSection: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  subheading: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    color: '#2c3e50',
  },
  actionButton: {
    display: 'block',
    width: '100%',
    padding: '0.75rem',
    marginBottom: '0.5rem',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#2c3e50',
  },
  form: {
    display: 'grid',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    width: '100%',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  overview: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    marginBottom: '2rem',
  },
  monthsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  monthCard: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #dee2e6',
  },
  monthTitle: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: '#2c3e50',
  },
  monthData: {
    fontSize: '0.9rem',
    color: '#666',
  },
  income: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  expense: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  transactionsContainer: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  transactionsList: {
    display: 'grid',
    gap: '1rem',
  },
  transactionCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #dee2e6',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  transactionDate: {
    color: '#666',
    fontSize: '0.9rem',
  },
  transactionAmount: (amount) => ({
    color: amount >= 0 ? '#2ecc71' : '#e74c3c',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  }),
  transactionDescription: {
    margin: 0,
    color: '#2c3e50',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
};

export default MainPage;