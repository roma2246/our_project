import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserData = localStorage.getItem('userData');
    
    if (!token) {
      navigate('/login');
    } else if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  if (!userData) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <h2 style={styles.title}>Менің профилім</h2>
        
        <div style={styles.userInfo}>
          <div style={styles.avatarContainer}>
            <div style={styles.avatar}>
              {userData.username ? userData.username[0].toUpperCase() : '?'}
            </div>
          </div>
          
          <div style={styles.infoContainer}>
            <div style={styles.infoItem}>
              <span style={styles.label}>Пайдаланушы аты:</span>
              <span style={styles.value}>{userData.username}</span>
            </div>
            
            <div style={styles.infoItem}>
              <span style={styles.label}>Рөлі:</span>
              <span style={styles.role}>{userData.role || 'Пайдаланушы'}</span>
            </div>
            
            <div style={styles.infoItem}>
              <span style={styles.label}>Тіркелген күні:</span>
              <span style={styles.value}>
                {new Date(userData.createdAt).toLocaleDateString('kk-KZ', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.label}>Email:</span>
              <span style={styles.value}>{userData.email}</span>
            </div>
          </div>
        </div>

        <button onClick={handleLogout} style={styles.logoutButton}>
          Шығу
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '2rem',
    textAlign: 'center',
    fontSize: '1.8rem',
  },
  userInfo: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    flexShrink: 0,
  },
  avatar: {
    width: '100px',
    height: '100px',
    backgroundColor: '#2ecc71',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  infoItem: {
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  label: {
    color: '#666',
    fontSize: '0.9rem',
  },
  value: {
    color: '#2c3e50',
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  role: {
    color: '#2ecc71',
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '2rem',
    width: '100%',
  },
};

export default ProfilePage; 