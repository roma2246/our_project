import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>Кәсіпкер</Link>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Басты бет</Link></li>
        <li><Link to="/login" style={styles.link}>Кіру</Link></li>
        <li><Link to="/register" style={styles.registerButton}>Тіркелу</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 3rem',
    backgroundColor: '#fdf6e3',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: '600',
  },
  logoLink: {
    textDecoration: 'none',
    color: '#657b83',
    transition: 'color 0.3s ease',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#586e75',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '0.5rem 0',
    borderBottom: '2px solid transparent',
    transition: 'color 0.3s ease, border-color 0.3s ease',
  },
  registerButton: {
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#268bd2',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
};

export default Navbar; 