const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../controllers/authController');
const { 
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/businessFinancesController');

// Get all transactions for a user
router.get('/', authenticateToken, getTransactions);

// Add new transaction
router.post('/', authenticateToken, addTransaction);

// Update transaction
router.put('/:id', authenticateToken, updateTransaction);

// Delete transaction
router.delete('/:id', authenticateToken, deleteTransaction);

module.exports = router; 