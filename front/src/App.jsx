import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
<<<<<<< HEAD
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import MainPage from './pages/MainPage.jsx';
=======
import Login from './pages/LoginPage.jsx';
import Register from './pages/RegisterPage.jsx';
>>>>>>> 719f701f2b977fff00f46897e2c1c59dde69982d

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/finance" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
