import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={scrolled ? 'ferrari-navbar scrolled' : 'ferrari-navbar'} style={styles.navbar}>
      <div style={styles.navContent}>
      <div style={styles.logo}>
          <Link to="/" style={styles.logoLink} className="logo-link">
            <img src="/favicon.svg" alt="Кәсіпкер логотипі" className="logo-image" />
            <span className="logo-text">Кәсіпкер</span>
          </Link>
        </div>
        
        <div style={styles.hamburger} onClick={toggleMenu}>
          <span style={styles.hamburgerLine}></span>
          <span style={styles.hamburgerLine}></span>
          <span style={styles.hamburgerLine}></span>
        </div>

        <ul style={{
          ...styles.navLinks,
          ...(!menuOpen && {
            '@media (max-width: 768px)': {
              display: 'none',
            }
          })
        }}>
          <li><Link to="/" style={styles.link}>Басты бет</Link></li>
          <li><Link to="/services" style={styles.link}>Қызметтер</Link></li>
          <li><Link to="/about" style={styles.link}>Біз туралы</Link></li>
          <li><Link to="/contact" style={styles.link}>Байланыс</Link></li>
          
          {isLoggedIn ? (
            <li className="auth-menu">
              <div style={styles.authMenu}>
                <span style={styles.username}>{username}</span>
                <button onClick={handleLogout} style={styles.authButton}>Шығу</button>
              </div>
            </li>
          ) : (
            <li className="auth-buttons">
              <div style={styles.authButtons}>
                <Link to="/login" style={styles.authButton}>Кіру</Link>
                <Link to="/register" style={styles.authButtonOutline}>Тіркелу</Link>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px 5%',
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    color: '#fff',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    transition: 'background-color 0.3s ease, padding 0.3s ease',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1400px',
  },
  logo: {
    fontWeight: '600',
  },
  logoLink: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '24px',
    transition: 'opacity 0.3s ease',
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '32px',
    height: '32px',
    marginRight: '10px',
    transition: 'transform 0.3s ease',
  },
  logoText: {
    marginLeft: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    margin: 0,
    padding: 0,
    transition: 'transform 0.3s ease',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    padding: '0.5rem 0',
    fontSize: '0.9rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'color 0.3s ease',
    position: 'relative',
  },
  authButtons: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  authMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  authButton: {
    backgroundColor: 'var(--primary-green)',
    color: '#fff',
    padding: '8px 20px',
    borderRadius: '0',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'background-color 0.3s',
    border: 'none',
    cursor: 'pointer',
  },
  authButtonOutline: {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: '7px 19px',
    borderRadius: '0',
    border: '1px solid #fff',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.3s',
  },
  username: {
    fontSize: '0.9rem',
    color: '#fff',
    fontWeight: '500',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '24px',
    height: '18px',
    cursor: 'pointer',
    zIndex: 100,
    '@media (max-width: 768px)': {
      display: 'flex',
    }
  },
  hamburgerLine: {
    width: '100%',
    height: '2px',
    backgroundColor: '#fff',
    transition: 'all 0.3s ease',
  },
};

export default Navbar; 