import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [appear, setAppear] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    setAppear(true);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    alert('Хабарлама жіберілді!');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  // Стили для ContactPage
  const styles = `
    .contact-page {
      padding: 100px 0;
      background-color: #f9f9f9;
    }

    .contact-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 50px;
      margin-top: 50px;
    }

    .contact-info, .contact-form {
      padding: 40px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    }

    .contact-info h2, .contact-form h2 {
      color: var(--primary-green);
      margin-bottom: 30px;
      font-size: 1.8rem;
    }

    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    .info-item i {
      font-size: 1.2rem;
      color: var(--primary-green);
      margin-right: 15px;
      width: 20px;
      text-align: center;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      border-color: var(--primary-green);
      outline: none;
    }

    .form-group textarea {
      min-height: 150px;
      resize: vertical;
    }

    .submit-btn {
      background-color: var(--primary-green);
      color: white;
      border: none;
      padding: 12px 30px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
    }

    .submit-btn:hover {
      background-color: #006a38;
      transform: translateY(-2px);
    }

    @media (min-width: 768px) {
      .contact-content {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `;

  // Добавляем стили
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  return (
    <div className={`contact-page ${appear ? 'appear' : ''} fade-in`}>
      <div className="contact-container">
        <h1 className="section-title fade-in">Байланыс</h1>
        
        <div className="contact-content">
          <div className="contact-info animate-on-scroll slide-from-left">
            <h2>Бізбен байланысу</h2>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>Қазақстан, Астана қаласы</p>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <p>+7 (700) 700-55-50</p>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <p>info@financetech.kz</p>
            </div>
          </div>

          <div className="contact-form animate-on-scroll slide-from-right" style={{animationDelay: '0.2s'}}>
            <h2>Хабарлама жіберу</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Аты-жөніңіз</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Электрондық поштаңыз</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Хабарламаңыз</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn hover-scale">
                Жіберу
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;