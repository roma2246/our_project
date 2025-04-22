const pool = require('../db');

// Get all transactions for a user
const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT * FROM business_finances WHERE user_id = $1 ORDER BY transaction_date DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Серверде қате орын алды' });
  }
};

// Add new transaction
const addTransaction = async (req, res) => {
  try {
    const { description, amount, category, transaction_date, type } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `INSERT INTO business_finances 
       (user_id, description, amount, category, transaction_date, type) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [userId, description, amount, category, transaction_date, type]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Транзакцияны сақтау кезінде қате орын алды' });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category, transaction_date, type } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `UPDATE business_finances 
       SET description = $1, amount = $2, category = $3, 
           transaction_date = $4, type = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 AND user_id = $7 
       RETURNING *`,
      [description, amount, category, transaction_date, type, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Транзакция табылмады' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Транзакцияны жаңарту кезінде қате орын алды' });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      'DELETE FROM business_finances WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Транзакция табылмады' });
    }

    res.json({ message: 'Транзакция сәтті жойылды' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Транзакцияны жою кезінде қате орын алды' });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
}; 