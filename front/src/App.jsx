import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import PrivateRoute from './components/PrivateRoute';

const globalStyles = `
  :root {
    --primary-green: #007F45;
    --white: #ffffff;
    --black: #1a1a1a;
    --gray: #f5f5f5;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
  }

  /* Глобальные анимации */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideInFromLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInFromRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInFromTop {
    from { opacity: 0; transform: translateY(-50px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideInFromBottom {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes scaleUp {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes hoverScale {
    from { transform: scale(1); }
    to { transform: scale(1.03); }
  }

  @keyframes hoverShadow {
    from { box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
    to { box-shadow: 0 15px 30px rgba(0,0,0,0.2); }
  }

  @keyframes hoverRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(5deg); }
  }

  /* Классы анимаций */
  .fade-in {
    animation: fadeIn 1s ease forwards;
  }

  .slide-from-left {
    animation: slideInFromLeft 1s ease forwards;
  }

  .slide-from-right {
    animation: slideInFromRight 1s ease forwards;
  }

  .slide-from-top {
    animation: slideInFromTop 1s ease forwards;
  }

  .slide-from-bottom {
    animation: slideInFromBottom 1s ease forwards;
  }

  .scale-up {
    animation: scaleUp 1s ease forwards;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  .hover-scale:hover {
    animation: hoverScale 0.3s ease forwards;
  }

  .hover-shadow:hover {
    animation: hoverShadow 0.3s ease forwards;
  }

  .hover-rotate:hover {
    animation: hoverRotate 0.3s ease forwards;
  }

  /* Анимации при скролле */
  .animate-on-scroll {
    opacity: 0;
    transition: all 0.8s ease;
  }

  .animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0) translateX(0) scale(1);
  }

  /* Основные стили приложения */
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .full-width-container {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .text-center {
    text-align: center;
  }

  .premium-button {
    background-color: var(--primary-green);
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
  }

  .premium-button-outline {
    background-color: transparent;
    color: var(--primary-green);
    padding: 11px 29px;
    border: 2px solid var(--primary-green);
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
  }

  .premium-button:hover, .premium-button-outline:hover {
    transform: translateY(-2px);
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 40px;
    position: relative;
    display: inline-block;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50%;
    height: 3px;
    background-color: var(--primary-green);
  }
`;

const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route 
            path="/services" 
            element={
              <PrivateRoute>
                <ServicesPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;