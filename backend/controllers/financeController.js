const pool = require('../db');

// Получить все транзакции пользователя
const getTransactions = async (req, res) => {
  try {
    console.log('User ID:', req.user.id); // Логируем ID пользователя
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT * FROM business_finances WHERE user_id = $1 ORDER BY transaction_date DESC',
      [userId]
    );
    console.log('Query result:', result.rows); // Логируем результат запроса
    res.json(result.rows);
  } catch (err) {
    console.error('Error in getTransactions:', err);
    res.status(500).json({ message: 'Ошибка при получении транзакций' });
  }
};

// Добавить новую транзакцию
const addTransaction = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Логируем тело запроса
    console.log('User ID:', req.user.id); // Логируем ID пользователя
    
    const { description, amount, type, transaction_date } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `INSERT INTO business_finances 
       (user_id, description, amount, type, transaction_date) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [userId, description, amount, type, transaction_date]
    );

    console.log('Insert result:', result.rows[0]); // Логируем результат вставки
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error in addTransaction:', err);
    res.status(500).json({ message: 'Ошибка при добавлении транзакции' });
  }
};

// Удалить транзакцию
const deleteTransaction = async (req, res) => {
  try {
    console.log('Transaction ID:', req.params.id); // Логируем ID транзакции
    console.log('User ID:', req.user.id); // Логируем ID пользователя
    
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      'DELETE FROM business_finances WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Транзакция не найдена' });
    }

    res.json({ message: 'Транзакция успешно удалена' });
  } catch (err) {
    console.error('Error in deleteTransaction:', err);
    res.status(500).json({ message: 'Ошибка при удалении транзакции' });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction
}; 