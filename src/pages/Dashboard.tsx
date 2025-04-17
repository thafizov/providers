import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

interface CardStats {
  id: string;
  cardId: string;
  bankName: string;
  dailyPayments: number;
  successRate: number;
  failedRate: number;
  balance: number;
}

// Примерные данные для демонстрации
const mockCardStats: CardStats[] = [
  {
    id: '1',
    cardId: '1278',
    bankName: 'Сбер',
    dailyPayments: 42,
    successRate: 95,
    failedRate: 5,
    balance: 156800,
  },
  {
    id: '2',
    cardId: '5678',
    bankName: 'Альфа',
    dailyPayments: 27,
    successRate: 88,
    failedRate: 12,
    balance: 98500,
  },
  {
    id: '3',
    cardId: '9012',
    bankName: 'Тинькофф',
    dailyPayments: 35,
    successRate: 92,
    failedRate: 8,
    balance: 124300,
  },
  {
    id: '4',
    cardId: '3456',
    bankName: 'ВТБ',
    dailyPayments: 19,
    successRate: 100,
    failedRate: 0,
    balance: 76200,
  },
];

// Сводная статистика
const totalDailyPayments = mockCardStats.reduce((sum, card) => sum + card.dailyPayments, 0);
const totalBalance = mockCardStats.reduce((sum, card) => sum + card.balance, 0);
const avgSuccessRate = Math.round(
  mockCardStats.reduce((sum, card) => sum + card.successRate, 0) / mockCardStats.length
);

// Цвета для карточек разных банков
const bankColors: Record<string, { bg: string, accent: string, logo: string }> = {
  'Сбер': { 
    bg: 'from-green-50 to-green-100',
    accent: 'bg-green-500',
    logo: 'bg-green-600'
  },
  'Альфа': { 
    bg: 'from-red-50 to-red-100',
    accent: 'bg-red-500',
    logo: 'bg-red-600'
  },
  'Тинькофф': { 
    bg: 'from-yellow-50 to-yellow-100',
    accent: 'bg-yellow-500',
    logo: 'bg-yellow-600'
  },
  'ВТБ': { 
    bg: 'from-blue-50 to-blue-100',
    accent: 'bg-blue-500',
    logo: 'bg-blue-600'
  },
};

const StatCard: React.FC<{ stats: CardStats }> = ({ stats }) => {
  const colors = bankColors[stats.bankName] || { 
    bg: 'from-gray-50 to-gray-100',
    accent: 'bg-gray-500',
    logo: 'bg-gray-600'
  };
  
  return (
    <div className={`bg-gradient-to-br ${colors.bg} rounded-xl shadow-sm overflow-hidden h-full transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100`}>
      <div className="p-5 h-full flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-md text-white ${colors.logo} mr-3`}>
              {stats.bankName.charAt(0)}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {stats.bankName} {stats.cardId}
            </h3>
          </div>
          <span className={`px-2 py-1 ${colors.accent} text-white text-xs font-medium rounded-md`}>
            {stats.dailyPayments} платежей
          </span>
        </div>
        
        <div className="space-y-4 mb-5">
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-medium text-gray-500">Успешные</div>
              <div className="text-xs font-semibold text-green-600">{stats.successRate}%</div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
              <div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                style={{ width: `${stats.successRate}%` }}
              ></div>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-medium text-gray-500">Неудачные</div>
              <div className="text-xs font-semibold text-red-600">{stats.failedRate}%</div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
              <div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                style={{ width: `${stats.failedRate}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-5 border-t border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Текущий баланс</div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.balance.toLocaleString('ru-RU')} ₽
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{ title: string; value: string; icon: string; color: string }> = ({ 
  title, value, icon, color 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <span className="material-icons-outlined text-white">{icon}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };
  
  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    
    // Не позволяем выбрать дату из будущего
    if (newDate <= new Date()) {
      setCurrentDate(newDate);
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };
  
  const dateElement = (
    <div className="flex items-center text-sm bg-white rounded-lg shadow-sm">
      <button 
        onClick={handlePrevDay}
        className="px-3 py-2 hover:bg-gray-50 rounded-l-lg transition-colors"
        aria-label="Предыдущий день"
      >
        <span className="material-icons-outlined text-gray-500">chevron_left</span>
      </button>
      
      <span className="px-3 py-2 font-medium">
        {isToday(currentDate) ? 'Сегодня' : formatDate(currentDate)}
      </span>
      
      <button 
        onClick={handleNextDay}
        className={`px-3 py-2 rounded-r-lg transition-colors ${
          isToday(currentDate) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-500'
        }`}
        disabled={isToday(currentDate)}
        aria-label="Следующий день"
      >
        <span className="material-icons-outlined">chevron_right</span>
      </button>
    </div>
  );

  return (
    <div>
      <PageHeader title="Дашборд" actions={dateElement} />
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard
          title="Всего транзакций сегодня"
          value={`${totalDailyPayments}`}
          icon="payments"
          color="bg-blue-500"
        />
        <SummaryCard
          title="Общий баланс"
          value={`${totalBalance.toLocaleString('ru-RU')} ₽`}
          icon="account_balance"
          color="bg-purple-500"
        />
        <SummaryCard
          title="Средний % успешных платежей"
          value={`${avgSuccessRate}%`}
          icon="verified"
          color="bg-green-500"
        />
      </div>
      
      {/* Card stats */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Состояние платежных карт</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockCardStats.map(stats => (
          <StatCard key={stats.id} stats={stats} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 