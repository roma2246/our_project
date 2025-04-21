import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');
    setLoading(true);

    if (!username || !email || !password) {
      setError('Барлық өрістерді толтырыңыз');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Құпия сөздер сәйкес келмейді');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Тіркелу кезінде қате орын алды');
      } else {
        setSuccess(data.message || 'Тіркелу сәтті өтті!');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        // Animate out before navigating
        setTimeout(() => {
          setAppear(false);
          setTimeout(() => {
            navigate('/login');
          }, 300);
        }, 1700);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Серверге қосылу мүмкін болмады');
    } finally {
      setLoading(false);
    }
  };

  // Define styles with animation delays
  const titleStyles = { ...styles.formTitle, animationDelay: '0.3s' };
  const usernameGroupStyles = { ...styles.inputGroup, animationDelay: '0.4s' };
  const emailGroupStyles = { ...styles.inputGroup, animationDelay: '0.5s' };
  const passwordGroupStyles = { ...styles.inputGroup, animationDelay: '0.6s' };
  const confirmPasswordGroupStyles = { ...styles.inputGroup, animationDelay: '0.7s' };
  const loginLinkStyles = { ...styles.loginLink, animationDelay: '1s' };
  const overlayHeadingStyles = { animationDelay: '0.3s' };
  const overlayParaStyles = { animationDelay: '0.5s' };

  return (
    <div className={`auth-page ${appear ? 'fade-in' : ''}`} style={styles.authPage}>
      <div className={`${appear ? 'scale-up' : ''}`} style={styles.authContainer}>
        <div className={`${appear ? 'slide-from-left' : ''}`} style={styles.formSide}>
          <div style={styles.formContainer}>
            <h2 className="animated-element slide-from-top" style={titleStyles}>ТІРКЕЛУ</h2>
            {success ? (
              <div style={styles.successMessage} className="animated-element pulse">
                <div className="animated-element bounce" style={{animationDelay: '0.2s'}}>✓</div>
                <p>{success}</p>
                <p>Кіру бетіне ауысу...</p>
              </div>
            ) : (
      <form onSubmit={handleSubmit} style={styles.form}>
                <div className="animated-element slide-from-right" style={usernameGroupStyles}>
                  <label htmlFor="username" style={styles.label}>Пайдаланушы аты</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
                    placeholder="Пайдаланушы аты"
                    className="hover-shadow"
            required
          />
        </div>
                <div className="animated-element slide-from-right" style={emailGroupStyles}>
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
                <div className="animated-element slide-from-right" style={passwordGroupStyles}>
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
                <div className="animated-element slide-from-right" style={confirmPasswordGroupStyles}>
                  <label htmlFor="confirmPassword" style={styles.label}>Құпия сөзді қайталаңыз</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                    placeholder="••••••••"
                    className="hover-shadow"
            required
          />
        </div>
                {error && <p style={styles.errorMessage} className="shake">{error}</p>}
                <button 
                  type="submit" 
                  style={{...styles.submitButton, animationDelay: '0.8s'}}
                  className="animated-element fade-in hover-shadow"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="pulse">Күте тұрыңыз...</span>
                  ) : (
                    'ТІРКЕЛУ'
                  )}
                </button>
                <p className="animated-element fade-in" style={loginLinkStyles}>
                  Аккаунтыңыз бар ма? <Link to="/login" style={styles.link} className="hover-scale">Кіру</Link>
                </p>
      </form>
            )}
          </div>
        </div>
        <div className={`${appear ? 'slide-from-right' : ''}`} style={styles.imgSide}>
          <div style={styles.overlay}>
            <div style={styles.overlayContent}>
              <h2 className="animated-element slide-from-bottom" style={overlayHeadingStyles}>Қош келдіңіз</h2>
              <p className="animated-element slide-from-bottom" style={overlayParaStyles}>Тіркеліп, бизнесіңізді басқаруды бастаңыз</p>
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
    backgroundColor: '#f5f5f5',
    padding: '20px',
    transition: 'opacity 0.5s ease-in-out',
    opacity: 0,
  },
  authContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '1000px',
    height: '700px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    overflow: 'hidden',
    transition: 'all 0.5s ease-in-out',
    transform: 'scale(0.95)',
  },
  imgSide: {
    flex: '1',
    backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    transition: 'transform 0.5s ease-in-out',
    transform: 'translateX(100%)',
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
    backgroundColor: '#fff',
    transition: 'transform 0.5s ease-in-out',
    transform: 'translateX(-100%)',
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
    marginBottom: '20px',
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
  successMessage: {
    color: '#34c759',
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#f8f8f8',
    borderRadius: '4px',
    marginBottom: '20px',
    animation: 'fadeIn 0.5s ease-in-out',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)',
  },
  loginLink: {
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
  
  .auth-page .successMessage div {
    font-size: 50px;
    color: #34c759;
    margin-bottom: 20px;
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

export default RegisterPage; 