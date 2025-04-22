import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfitChart = ({ transactions }) => {
  // Группируем транзакции по месяцам
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.transaction_date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        income: 0,
        expenses: 0
      };
    }

    const amount = Number(transaction.amount);
    if (amount > 0) {
      acc[monthKey].income += amount;
    } else {
      acc[monthKey].expenses += Math.abs(amount);
    }

    return acc;
  }, {});

  // Сортируем месяцы
  const sortedMonths = Object.keys(monthlyData).sort();

  // Готовим данные для графика
  const data = {
    labels: sortedMonths.map(month => {
      const [year, monthNum] = month.split('-');
      const date = new Date(year, parseInt(monthNum) - 1);
      return date.toLocaleString('kk-KZ', { month: 'long', year: 'numeric' });
    }),
    datasets: [
      {
        label: 'Кірістер',
        data: sortedMonths.map(month => monthlyData[month].income),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Шығыстар',
        data: sortedMonths.map(month => monthlyData[month].expenses),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Кірістер мен шығыстар графигі'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('kk-KZ', {
              style: 'currency',
              currency: 'KZT',
              maximumFractionDigits: 0
            }).format(value);
          }
        }
      }
    }
  };

  return (
    <div className="chart-container" style={{ width: '100%', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProfitChart; 