const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/financeController');
const auth = require('../middleware/auth');

// Все маршруты защищены middleware аутентификации
router.use(auth);

// Получить все транзакции
router.get('/', getTransactions);

// Добавить новую транзакцию
router.post('/', addTransaction);

// Удалить транзакцию
router.delete('/:id', deleteTransaction);

module.exports = router; 