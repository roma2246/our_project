import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    setIsVisible(true);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Стили для HomePage
  const styles = `
    .premium-layout {
      opacity: 0;
      transition: opacity 1s ease;
    }
    
    .premium-layout.visible {
      opacity: 1;
    }

    .hero-section {
      background-image: url("https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&q=80&w=2070");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      width: 100%;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      padding: 20px;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-content h1 {
      font-size: 4rem;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .hero-content p {
      font-size: 1.2rem;
      margin-bottom: 30px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    }

    .button-container {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .features-section {
      padding: 100px 0;
      background-color: white;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }

    .feature-card {
      padding: 40px;
      background-color: var(--gray);
      transition: all 0.4s ease;
      position: relative;
      top: 0;
    }

    .feature-card:hover {
      top: -10px;
    }

    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      color: var(--primary-green);
    }

    .performance-section {
      display: flex;
      background-color: var(--black);
      color: white;
    }

    .perf-image, .perf-content {
      width: 50%;
    }

    .perf-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .perf-content {
      padding: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .perf-content h2 {
      font-size: 2rem;
      margin-bottom: 20px;
    }

    .perf-stats {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      color: var(--primary-green);
      margin-bottom: 10px;
    }

    .stat-label {
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .cta-section {
      padding: 100px 0;
      background-color: var(--primary-green);
      color: white;
      text-align: center;
    }

    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 40px;
    }

    @media (max-width: 992px) {
      .performance-section {
        flex-direction: column;
      }
      
      .perf-image, .perf-content {
        width: 100%;
      }
      
      .perf-content {
        padding: 50px 20px;
      }
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 3rem;
      }
      
      .perf-stats {
        flex-direction: column;
        gap: 30px;
      }
      
      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  `;

  // Добавляем стили для HomePage
  const homePageStyles = document.createElement('style');
  homePageStyles.textContent = styles;
  document.head.appendChild(homePageStyles);

  return (
    <div className={`premium-layout ${isVisible ? 'visible' : ''} fade-in`}>
      {/* Hero Section */}
      <section className="hero-section full-width-container">
        <div className="hero-content">
          <h1 className="slide-from-left">Кәсіпкер</h1>
          <div className="fade-in" style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
            <img 
              src="/favicon.svg" 
              alt="Кәсіпкер логотипі" 
              className="pulse" 
              style={{width: '80px', height: '80px'}} 
            />
          </div>
          <p className="slide-from-right">Сіздің бизнесіңізді басқаруға арналған сенімді құрал. Кірістер мен шығыстарды оңай бақылаңыз.</p>
          <div className="button-container slide-from-bottom">
            {isLoggedIn ? (
              <div>
                <Link to="/dashboard" className="premium-button hover-shadow">Жеке кабинет</Link>
                <Link to="/reports" className="premium-button-outline hover-shadow">Есептер</Link>
              </div>
            ) : (
              <div>
                <Link to="/login" className="premium-button pulse hover-shadow">Кіру</Link>
                <Link to="/register" className="premium-button-outline hover-shadow">Тіркелу</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section full-width-container">
        <div className="container">
          <h2 className="section-title animate-on-scroll">МҮМКІНДІКТЕР</h2>
          <div className="features-grid">
            <div className="feature-card animate-on-scroll hover-shadow">
              <h3>Кірістер мен шығыстарды оңай тіркеу</h3>
              <p>Барлық қаржылық операцияларды қарапайым интерфейс арқылы тіркеңіз. Кез-келген уақытта және кез-келген жерден қолжетімді.</p>
            </div>
            <div className="feature-card animate-on-scroll hover-shadow" style={{animationDelay: '0.2s'}}>
              <h3>Автоматты түрде есептер құру</h3>
              <p>Әртүрлі кезеңдер бойынша толық қаржылық есептерді бір батырманы басу арқылы жасаңыз.</p>
            </div>
            <div className="feature-card animate-on-scroll hover-shadow" style={{animationDelay: '0.4s'}}>
              <h3>Қаржылық жағдайды нақты уақытта бақылау</h3>
              <p>Бизнесіңіздің қаржылық жағдайын кез-келген уақытта бақылаңыз.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="performance-section full-width-container">
        <div className="perf-image animate-on-scroll hover-scale">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
            alt="Business performance" 
          />
        </div>
        <div className="perf-content animate-on-scroll">
          <h2>БИЗНЕС КӨРСЕТКІШТЕРІҢІЗДІ ЖАҚСАРТЫҢЫЗ</h2>
          <p>Нақты деректерге негізделген шешімдер қабылдау арқылы бизнесіңіздің табыстылығын арттырыңыз.</p>
          <div className="perf-stats">
            <div className="stat-item animate-on-scroll" style={{animationDelay: '0.2s'}}>
              <span className="stat-number pulse">30%</span>
              <span className="stat-label">Уақытты үнемдеу</span>
            </div>
            <div className="stat-item animate-on-scroll" style={{animationDelay: '0.4s'}}>
              <span className="stat-number pulse">25%</span>
              <span className="stat-label">Табысты арттыру</span>
            </div>
            <div className="stat-item animate-on-scroll" style={{animationDelay: '0.6s'}}>
              <span className="stat-number pulse">100%</span>
              <span className="stat-label">Қауіпсіздік</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section full-width-container">
        <div className="container text-center">
          <h2 className="animate-on-scroll">ҚАЗІР БАСТАҢЫЗ</h2>
          <p className="animate-on-scroll">Бүгін тіркеліп, бизнесіңізді жаңа деңгейге көтеріңіз</p>
          <div className="cta-buttons animate-on-scroll">
            <Link to="/register" className="premium-button bounce hover-shadow">ТІРКЕЛУ</Link>
            <Link to="/about" className="premium-button-outline hover-rotate">Көбірек білу</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;