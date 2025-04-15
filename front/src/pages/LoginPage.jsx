import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [appear, setAppear] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Animation on mount
    setTimeout(() => {
      setAppear(true);
    }, 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Электрондық пошта мен құпия сөзді енгізіңіз');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || 'Кіру кезінде қате орын алды');
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        // Animation before redirect
        setAppear(false);
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 300);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Серверге қосылу мүмкін болмады');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-page ${appear ? 'fade-in' : ''}`} style={styles.authPage}>
      <div className="auth-container" style={styles.authContainer}>
        <div className="auth-left" style={styles.authLeft}>
          <div className="auth-content" style={styles.authContent}>
            <div className="logo-container" style={styles.logoContainer}>
              <img src="/favicon.svg" alt="Кәсіпкер логотипі" style={styles.logo} />
            </div>
            <h1 style={styles.title}>Кіру</h1>
            <p style={styles.subtitle}>Аккаунтыңызға кіріңіз</p>
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <div style={styles.inputWrapper}>
                  <i className="fas fa-envelope" style={styles.inputIcon}></i>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    placeholder="Электрондық пошта"
                    required
                  />
                </div>
              </div>
              
              <div style={styles.inputGroup}>
                <div style={styles.inputWrapper}>
                  <i className="fas fa-lock" style={styles.inputIcon}></i>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    placeholder="Құпия сөз"
                    required
                  />
                </div>
              </div>
              
              {error && <p style={styles.errorMessage}>{error}</p>}
              
              <button 
                type="submit" 
                style={styles.submitButton}
                disabled={loading}
              >
                {loading ? 'Күте тұрыңыз...' : 'Кіру'}
              </button>
              
              <p style={styles.registerLink}>
                Аккаунтыңыз жоқ па? <Link to="/register" style={styles.link}>Тіркелу</Link>
              </p>
            </form>
          </div>
        </div>
        
        <div className="auth-right" style={styles.authRight}>
          <div style={styles.overlay}>
            <div style={styles.overlayContent}>
              <h2 style={styles.overlayTitle}>Қош келдіңіз</h2>
              <p style={styles.overlayText}>Жүйеге кіріп, бизнесіңізді басқара бастаңыз</p>
              
              <div style={styles.features}>
                <div style={styles.featureItem}>
                  <i className="fas fa-chart-line" style={styles.featureIcon}></i>
                  <span style={styles.featureText}>Қаржылық бақылау</span>
                </div>
                <div style={styles.featureItem}>
                  <i className="fas fa-file-invoice-dollar" style={styles.featureIcon}></i>
                  <span style={styles.featureText}>Есептер</span>
                </div>
                <div style={styles.featureItem}>
                  <i className="fas fa-chart-pie" style={styles.featureIcon}></i>
                  <span style={styles.featureText}>Талдау</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  authPage: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e0e8f0 100%)',
    transition: 'opacity 0.5s ease-in-out',
    opacity: 0,
  },
  authContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '1000px',
    height: '600px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
    borderRadius: '15px',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  authLeft: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: '#fff',
  },
  authContent: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  logo: {
    width: '60px',
    height: '60px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '10px',
    color: '#333',
    fontSize: '2rem',
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#666',
    fontSize: '1rem',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  inputWrapper: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--primary-green)',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '15px 15px 15px 45px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: 'var(--primary-green)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
  },
  errorMessage: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: '15px',
    fontSize: '0.9rem',
  },
  registerLink: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '0.9rem',
    color: '#666',
  },
  link: {
    color: 'var(--primary-green)',
    fontWeight: '500',
    textDecoration: 'none',
  },
  authRight: {
    flex: '1',
    backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 103, 55, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  overlayContent: {
    color: '#fff',
    textAlign: 'center',
  },
  overlayTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '15px',
  },
  overlayText: {
    fontSize: '1.1rem',
    marginBottom: '30px',
  },
  features: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30px',
  },
  featureItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 10px',
  },
  featureIcon: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#fff',
  },
  featureText: {
    fontSize: '0.9rem',
  },
};

// Add dynamic styles for animations
const style = document.createElement('style');
style.textContent = `
  .auth-page.fade-in {
    opacity: 1;
  }
  
  .auth-page input:focus {
    border-color: var(--primary-green);
    box-shadow: 0 0 0 2px rgba(0, 103, 55, 0.2);
    outline: none;
  }
  
  .auth-page .submitButton:hover {
    background-color: #005c3a;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 103, 55, 0.3);
  }
  
  .auth-page .link:hover {
    text-decoration: underline;
  }
`;
document.head.appendChild(style);

export default LoginPage; 