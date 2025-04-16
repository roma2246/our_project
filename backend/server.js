const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const financeRoutes = require("./routes/financeRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Маршруты
app.use("/api/auth", authRoutes);
app.use("/api/finances", financeRoutes);

// Тестовый маршрут
app.get("/", (req, res) => {
  res.json({ message: "API работает 🚀" });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Что-то пошло не так!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Обработка несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ message: `Маршрут ${req.url} не найден` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Auth routes: /api/auth/*`);
  console.log(`Finance routes: /api/finances/*`);
});
