import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Кәсіптің кіріс-шығысын бақылау және автоматты есеп беру жүйесі</h1>
        <p style={styles.subtitle}>Сіздің бизнесіңізді басқаруға арналған сенімді құрал</p>
      </header>
      <section style={styles.features}>
        <h2>Мүмкіндіктер</h2>
        <ul>
          <li>Кірістер мен шығыстарды оңай тіркеу</li>
          <li>Автоматты түрде есептер құру</li>
          <li>Қаржылық жағдайды нақты уақытта бақылау</li>
          {/* Қажет болса, басқа мүмкіндіктерді қосыңыз */}
        </ul>
      </section>
      <footer style={styles.footer}>
        <p>&copy; 2024 Барлық құқықтар қорғалған.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif', // Негізгі қаріп
    color: 'white',
    textAlign: 'center',
  },
  header: {
    marginBottom: '3rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666', // Сұр түсті қосымша мәтін
  },
  features: {
    marginBottom: '3rem',
  },
   // Добавим стили для списка, если они нужны
  features_ul: {
      listStyle: 'none', // Убрать маркеры списка
      padding: 0,
      margin: '1rem 0',
  },
  features_li: {
      marginBottom: '0.5rem',
  },
  footer: {
    marginTop: '3rem',
    paddingTop: '1rem',
    borderTop: '1px solid #eee', // Бөлгіш сызық
    fontSize: '0.9rem',
    color: '#777',
  },
};

export default HomePage; 