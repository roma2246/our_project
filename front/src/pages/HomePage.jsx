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

    // Сразу установим видимость, без задержки
    setIsVisible(true);

    // Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // После добавления видимости перестаем наблюдать за элементом
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Небольшая задержка для загрузки DOM перед наблюдением
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

  return (
    <div className={`premium-layout ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section full-width-container" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&q=80&w=2070")',
        width: '100%',
        margin: '0',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div className="hero-content" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '800px',
          padding: '0 20px',
          margin: '0 auto'
        }}>
          <h1 className="animated-element slide-from-left" style={{textAlign: 'center'}}>Кәсіпкер</h1>
          <div className="animated-element fade-in" style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
            <img src="/favicon.svg" alt="Кәсіпкер логотипі" style={{width: '80px', height: '80px'}} className="pulse" />
          </div>
          <p className="animated-element slide-from-right" style={{textAlign: 'center', maxWidth: '600px'}}>Сіздің бизнесіңізді басқаруға арналған сенімді құрал. Кірістер мен шығыстарды оңай бақылаңыз.</p>
          <div className="button-container animated-element slide-from-bottom">
            {isLoggedIn ? (
              <div>
                <Link to="/dashboard" className="premium-button">Жеке кабинет</Link>
                <Link to="/reports" className="premium-button-outline">Есептер</Link>
              </div>
            ) : (
              <div>
                <Link to="/login" className="premium-button pulse">Кіру</Link>
                <Link to="/register" className="premium-button-outline">Тіркелу</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="premium-section full-width-container" style={styles.featuresSection}>
        <div className="container">
          <h2 style={styles.sectionTitle} className="animated-element scale-up animate-on-scroll">МҮМКІНДІКТЕР</h2>
          <div style={styles.featuresGrid}>
            <div className="feature-card animated-element slide-from-left animate-on-scroll hover-shadow" style={{...styles.featureCard}}>
              <h3>Кірістер мен шығыстарды оңай тіркеу</h3>
              <p>Барлық қаржылық операцияларды қарапайым интерфейс арқылы тіркеңіз. Кез-келген уақытта және кез-келген жерден қолжетімді.</p>
            </div>
            <div className="feature-card animated-element fade-in animate-on-scroll hover-shadow" style={{...styles.featureCard, animationDelay: '0.2s'}}>
              <h3>Автоматты түрде есептер құру</h3>
              <p>Әртүрлі кезеңдер бойынша толық қаржылық есептерді бір батырманы басу арқылы жасаңыз. Бизнесіңіздің жағдайын әрқашан бақылауда ұстаңыз.</p>
            </div>
            <div className="feature-card animated-element slide-from-right animate-on-scroll hover-shadow" style={{...styles.featureCard, animationDelay: '0.4s'}}>
              <h3>Қаржылық жағдайды нақты уақытта бақылау</h3>
              <p>Бизнесіңіздің қаржылық жағдайын кез-келген уақытта бақылаңыз. Тиімді шешімдер қабылдау үшін толық ақпаратқа ие болыңыз.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section style={styles.performanceSection} className="animated-element fade-in animate-on-scroll full-width-container">
        <div className="animated-element slide-from-left animate-on-scroll" style={styles.perfHalf}>
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015"
            alt="Business performance"
            style={styles.perfImage}
            className="hover-scale"
          />
        </div>
        <div className="animated-element slide-from-right animate-on-scroll" style={styles.perfContent}>
          <h2>БИЗНЕС КӨРСЕТКІШТЕРІҢІЗДІ ЖАҚСАРТЫҢЫЗ</h2>
          <p>Нақты деректерге негізделген шешімдер қабылдау арқылы бизнесіңіздің табыстылығын арттырыңыз. Біздің платформа қаржыларыңызды басқаруды жеңілдетеді және көбірек табыс табуға көмектеседі.</p>
          <div style={styles.perfStats}>
            <div className="animated-element scale-up animate-on-scroll" style={{...styles.statItem, animationDelay: '0.2s'}}>
              <span style={styles.statNumber} className="pulse">30%</span>
              <span style={styles.statLabel}>Уақытты үнемдеу</span>
            </div>
            <div className="animated-element scale-up animate-on-scroll" style={{...styles.statItem, animationDelay: '0.4s'}}>
              <span style={styles.statNumber} className="pulse">25%</span>
              <span style={styles.statLabel}>Табысты арттыру</span>
            </div>
            <div className="animated-element scale-up animate-on-scroll" style={{...styles.statItem, animationDelay: '0.6s'}}>
              <span style={styles.statNumber} className="pulse">100%</span>
              <span style={styles.statLabel}>Қауіпсіздік</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={styles.ctaSection} className="full-width-container">
        <div className="container text-center">
          <h2 className="animated-element slide-from-top animate-on-scroll">ҚАЗІР БАСТАҢЫЗ</h2>
          <p className="animated-element fade-in animate-on-scroll">Бүгін тіркеліп, бизнесіңізді жаңа деңгейге көтеріңіз</p>
          <div className="animated-element slide-from-bottom animate-on-scroll" style={styles.ctaButtons}>
            <Link to="/register" className="premium-button bounce">ТІРКЕЛУ</Link>
            <Link to="/about" style={styles.learnMoreLink} className="hover-rotate">Көбірек білу</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  featuresSection: {
    background: '#fff',
    padding: '100px 0',
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: '60px',
    position: 'relative',
    fontSize: '2.5rem',
    fontWeight: '700',
    letterSpacing: '2px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
  },
  featureCard: {
    padding: '40px',
    backgroundColor: '#f5f5f5',
    transition: 'all 0.4s ease',
    position: 'relative',
    top: '0',
    opacity: '0',
  },
  performanceSection: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    margin: '0',
    '@media (max-width: 992px)': {
      flexDirection: 'column',
    }
  },
  perfHalf: {
    width: '50%',
    overflow: 'hidden',
    '@media (max-width: 992px)': {
      width: '100%',
    }
  },
  perfImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  perfContent: {
    width: '50%',
    padding: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    '@media (max-width: 992px)': {
      width: '100%',
      padding: '50px 20px',
    }
  },
  perfStats: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '40px',
    width: '100%',
    maxWidth: '800px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '30px',
    }
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: '0',
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    color: 'var(--primary-green)',
    marginBottom: '10px',
  },
  statLabel: {
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  ctaSection: {
    padding: '100px 0',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#007F45',
    color: 'var(--white)',
    width: '100%',
    maxWidth: '100%',
    margin: '0',
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '40px',
  },
  learnMoreLink: {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#ffffff',
    fontWeight: '500',
    textDecoration: 'none',
    padding: '12px 20px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    border: '1px solid #ffffff',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
};

// Обновленные стили для анимаций
const style = document.createElement('style');
style.textContent = `
  .premium-layout {
    opacity: 0;
    transition: opacity 1s ease;
  }
  
  .premium-layout.visible {
    opacity: 1;
  }

  .animate-on-scroll {
    opacity: 0;
    transition: opacity 0.8s ease, transform 0.8s ease;
    will-change: opacity, transform;
  }

  .animate-on-scroll.visible {
    opacity: 1 !important; /* Важно, чтобы перекрыть все другие стили */
    transform: translateY(0) translateX(0) scale(1);
  }
  
  /* Стили для предварительной анимации */
  .animated-element.slide-from-left {
    opacity: 0;
    transform: translateX(-50px);
    animation: slideInFromLeft 1s forwards;
  }
  
  .animated-element.slide-from-right {
    opacity: 0;
    transform: translateX(50px);
    animation: slideInFromRight 1s forwards;
  }
  
  .animated-element.slide-from-bottom {
    opacity: 0;
    transform: translateY(50px);
    animation: slideInFromBottom 1s forwards;
  }
  
  .animated-element.slide-from-top {
    opacity: 0;
    transform: translateY(-50px);
    animation: slideInFromTop 1s forwards;
  }
  
  .animated-element.fade-in {
    opacity: 0;
    animation: fadeIn 1s forwards;
  }
  
  .animated-element.scale-up {
    opacity: 0;
    transform: scale(0.8);
    animation: scaleUp 1s forwards;
  }
  
  /* Убедимся, что все анимированные элементы останутся видимыми после анимации */
  .animated-element {
    animation-fill-mode: forwards !important;
  }
`;
document.head.appendChild(style);

export default HomePage; 