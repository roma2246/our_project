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

  const titleStyles = {
    ...styles.formTitle,
    animationDelay: '0.3s'
  };

  const inputGroupStyles1 = {
    ...styles.inputGroup,
    animationDelay: '0.5s'
  };

  const inputGroupStyles2 = {
    ...styles.inputGroup,
    animationDelay: '0.7s'
  };

  const registerLinkStyles = {
    ...styles.registerLink,
    animationDelay: '1s'
  };

  const overlayHeadingStyles = {
    animationDelay: '0.3s'
  };

  const overlayParaStyles = {
    animationDelay: '0.5s'
  };

  return (
    <div className={`auth-page ${appear ? 'fade-in' : ''}`} style={styles.authPage}>
      <div className={`${appear ? 'scale-up' : ''}`} style={styles.authContainer}>
        <div className={`${appear ? 'slide-from-left' : ''}`} style={styles.imgSide}>
          <div style={styles.overlay}>
            <div style={styles.overlayContent}>
              <h2 className="animated-element slide-from-bottom" style={overlayHeadingStyles}>Қош келдіңіз</h2>
              <p className="animated-element slide-from-bottom" style={overlayParaStyles}>Жүйеге кіріп, бизнесіңізді басқара бастаңыз</p>
            </div>
          </div>
        </div>
        <div className={`${appear ? 'slide-from-right' : ''}`} style={styles.formSide}>
          <div style={styles.formContainer}>
            <h2 className="animated-element slide-from-top" style={titleStyles}>КІРУ</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
              <div className="animated-element fade-in" style={inputGroupStyles1}>
                <label htmlFor="email" style={styles.label}>Электрондық пошта</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
                  placeholder="email@example.com"
                  className="hover-shadow"
            required
          />
        </div>
              <div className="animated-element fade-in" style={inputGroupStyles2}>
                <label htmlFor="password" style={styles.label}>Құпия сөз</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
                  placeholder="••••••••"
                  className="hover-shadow"
            required
          />
        </div>
              {error && <p style={styles.errorMessage} className="shake">{error}</p>}
              <button 
                type="submit" 
                style={styles.submitButton}
                className="animated-element slide-from-bottom hover-shadow"
                disabled={loading}
              >
                {loading ? (
                  <span className="pulse">Күте тұрыңыз...</span>
                ) : (
                  'КІРУ'
                )}
              </button>
              <p className="animated-element fade-in" style={registerLinkStyles}>
                Аккаунтыңыз жоқ па? <Link to="/register" style={styles.link} className="hover-scale">Тіркелу</Link>
              </p>
      </form>
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
    backgroundColor: '#f5f5f5',
    padding: '20px',
    transition: 'opacity 0.5s ease-in-out',
    opacity: 0,
  },
  authContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '1000px',
    height: '600px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    overflow: 'hidden',
    transition: 'all 0.5s ease',
    transform: 'scale(0.95)',
  },
  imgSide: {
    flex: '1',
    backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    transition: 'transform 0.5s ease',
    transform: 'translateX(-100%)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  overlayContent: {
    color: '#fff',
    textAlign: 'center',
  },
  formSide: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px',
    transition: 'transform 0.5s ease',
    transform: 'translateX(100%)',
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '100%',
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#1a1a1a',
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '2px',
    position: 'relative',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: '25px',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#555',
    transition: 'transform 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: 'var(--primary-green)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    position: 'relative',
    overflow: 'hidden',
  },
  errorMessage: {
    color: 'var(--primary-green)',
    textAlign: 'center',
    marginBottom: '15px',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  registerLink: {
    textAlign: 'center',
    marginTop: '25px',
    fontSize: '0.9rem',
    color: '#555',
  },
  link: {
    color: 'var(--primary-green)',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'inline-block',
  },
};

// Add dynamic styles for animations
const style = document.createElement('style');
style.textContent = `
  .auth-page.fade-in {
    opacity: 1;
  }
  
  .auth-page .scale-up {
    transform: scale(1);
  }
  
  .auth-page .slide-from-left {
    transform: translateX(0);
  }
  
  .auth-page .slide-from-right {
    transform: translateX(0);
  }
  
  .auth-page label:focus-within {
    transform: translateY(-5px);
    color: var(--primary-green);
  }
  
  .auth-page .hover-shadow:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transform: translateY(-3px);
  }
  
  .auth-page .hover-scale:hover {
    transform: scale(1.05);
  }
  
  @keyframes buttonShine {
    0% {
      left: -100px;
    }
    20% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
  
  .auth-page button:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -100px;
    width: 70px;
    height: 200%;
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(25deg);
    transition: all 0.7s ease-in-out;
  }
  
  .auth-page button:hover:after {
    animation: buttonShine 1s ease-in-out;
  }
`;
document.head.appendChild(style);

export default LoginPage; 