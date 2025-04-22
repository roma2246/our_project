import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [appear, setAppear] = useState(false);

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

  // Стили для AboutPage
  const styles = `
    .about-page {
      padding: 100px 0;
      background-color: #f9f9f9;
    }

    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .about-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 50px;
      margin-top: 50px;
    }

    .about-section {
      padding: 40px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
      transition: all 0.3s ease;
    }

    .about-section:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }

    .about-section h2 {
      color: var(--primary-green);
      margin-bottom: 20px;
      font-size: 1.8rem;
    }

    .about-section p {
      line-height: 1.8;
      margin-bottom: 15px;
    }

    .about-section ul {
      padding-left: 20px;
    }

    .about-section li {
      margin-bottom: 10px;
      line-height: 1.6;
    }

    @media (min-width: 768px) {
      .about-content {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .about-section:nth-child(odd) {
        animation: slideInFromLeft 1s ease forwards;
      }
      
      .about-section:nth-child(even) {
        animation: slideInFromRight 1s ease forwards;
      }
    }
  `;

  // Добавляем стили
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  return (
    <div className={`about-page ${appear ? 'appear' : ''} fade-in`}>
      <div className="about-container">
        <h1 className="section-title fade-in">Біз туралы</h1>
        
        <div className="about-content">
          <div className="about-section animate-on-scroll">
            <h2>Біздің миссиямыз</h2>
            <p>
              Біздің миссиямыз - қазақстандықтардың қаржылық білімдерін арттыру және 
              олардың қаржылық қауіпсіздігін қамтамасыз ету. Біз әрбір адамның қаржылық 
              болашағын жақсартуға көмектесуді мақсат етеміз.
            </p>
          </div>

          <div className="about-section animate-on-scroll" style={{animationDelay: '0.2s'}}>
            <h2>Біздің құндылықтарымыз</h2>
            <ul>
              <li>Әділдік және ашықтық</li>
              <li>Клиенттерге деген жауапкершілік</li>
              <li>Үздіксіз даму және инновация</li>
              <li>Қоғамдық пайда</li>
            </ul>
          </div>

          <div className="about-section animate-on-scroll" style={{animationDelay: '0.4s'}}>
            <h2>Біздің тарихымыз</h2>
            <p>
              2024 жылы құрылған біздің компания қаржылық білім беру саласында 
              жетекші болуды мақсат етеді. Біздің тәжірибелі мамандар тобы 
              қаржылық саладағы 20 жылдан астам тәжірибеге ие.
            </p>
          </div>

          <div className="about-section animate-on-scroll" style={{animationDelay: '0.6s'}}>
            <h2>Біздің командамыз</h2>
            <p>
              Біздің командамыз қаржылық саладағы тәжірибелі мамандардан тұрады. 
              Әрбір мүшесі өз саласында жетекші болып табылады және клиенттерге 
              ең жақсы шешімдерді ұсынуға дайын.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;