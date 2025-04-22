import React, { useState } from 'react';
import { addTransaction } from '../services/financeService';
import '../styles/TransactionModal.css';

const TransactionModal = ({ isOpen, onClose, type, onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    transaction_date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const transaction = {
        ...formData,
        type: type,
        amount: type === 'expense' ? -Math.abs(Number(formData.amount)) : Math.abs(Number(formData.amount))
      };

      const result = await addTransaction(transaction);
      
      // Очищаем форму
      setFormData({
        description: '',
        amount: '',
        category: '',
        transaction_date: new Date().toISOString().split('T')[0]
      });

      // Уведомляем родительский компонент об успешном добавлении
      if (onTransactionAdded) {
        onTransactionAdded(result);
      }

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{type === 'income' ? 'Кіріс қосу' : 'Шығыс қосу'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Сипаттама:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Мысалы: Жалақы немесе Азық-түлік"
            />
          </div>
          <div className="form-group">
            <label>Сома (₸):</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              required
              placeholder="150000"
            />
          </div>
          <div className="form-group">
            <label>Күні:</label>
            <input
              type="date"
              name="transaction_date"
              value={formData.transaction_date}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="form-group">
            <label>Санат:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Мысалы: Жұмыс немесе Тамақ"
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? 'Сақталуда...' : 'Сақтау'}
            </button>
            <button type="button" onClick={onClose} className="cancel-button" disabled={loading}>
              Бас тарту
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal; 