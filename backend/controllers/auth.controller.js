const pool = require("../db");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
      [username, email, hashed]
    );

    res.status(201).json({ message: "Регистрация успешна", user_id: newUser.rows[0].id });
  } catch (err) {
    console.error("Ошибка:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = { registerUser };
